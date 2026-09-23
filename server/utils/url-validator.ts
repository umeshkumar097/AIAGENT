import { URL } from 'url';
import dns from 'dns';
import { promisify } from 'util';
import net from 'net';

const dnsLookup = promisify(dns.lookup);

const BLOCKED_HOSTNAMES = [
  'localhost',
  '127.0.0.1',
  '[::1]',
  '0.0.0.0',
  '169.254.169.254',
  'metadata.google.internal',
];

/** `::ffff:a.b.c.d` or `::ffff:xxxx:yyyy` → dotted IPv4, else null */
function mappedIPv4(ip: string): string | null {
  const dotted = ip.match(/^(?:0*:)*ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i);
  if (dotted) return dotted[1];
  const hex = ip.match(/^(?:0*:)*ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
  if (hex) {
    const hi = parseInt(hex[1], 16);
    const lo = parseInt(hex[2], 16);
    return `${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`;
  }
  return null;
}

export function isPrivateIP(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const parts = ip.split('.').map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) return true; // CGNAT / cloud metadata ranges
    if (parts[0] === 0) return true;
    if (parts[0] >= 224) return true; // multicast + reserved
  }
  if (net.isIPv6(ip)) {
    const mapped = mappedIPv4(ip);
    if (mapped) return isPrivateIP(mapped);
    const lower = ip.toLowerCase();
    if (lower === '::1' || lower === '::' || /^f[cd]/.test(lower) || /^fe[89ab]/.test(lower)) return true;
  }
  return false;
}

export async function validateWebhookUrl(url: string): Promise<{ valid: boolean; error?: string }> {
  try {
    const parsed = new URL(url);

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'Only HTTP and HTTPS URLs are allowed' };
    }

    const hostname = parsed.hostname.replace(/^\[|\]$/g, '');

    if (BLOCKED_HOSTNAMES.includes(hostname)) {
      return { valid: false, error: 'Webhook URL must not point to a local or internal address' };
    }

    if (net.isIP(hostname)) {
      if (isPrivateIP(hostname)) {
        return { valid: false, error: 'Webhook URL must not point to a private IP address' };
      }
    } else {
      try {
        // Check every answer (A + AAAA): a host with one public and one private record must not pass
        const answers = await dnsLookup(hostname, { all: true });
        if (!answers.length || answers.some((a) => isPrivateIP(a.address))) {
          return { valid: false, error: 'Webhook URL resolves to a private IP address' };
        }
      } catch {
        return { valid: false, error: 'Could not resolve webhook URL hostname' };
      }
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}
