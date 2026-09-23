/**
 * Hybrid Authentication Middleware
 * 
 * This middleware accepts both regular user JWT tokens AND team member session tokens.
 * When a team member is authenticated, it sets req.userId to the parent user's ID
 * so that all existing API routes work seamlessly with team members.
 * 
 * Uses the Team Management adapter for optional plugin loading.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { 
  validateUserTeamSession, 
  validateAdminTeamSession,
  isTeamManagementInstalled,
  type TeamMemberContext,
  type AdminTeamMemberContext 
} from "../plugins/team-management-adapter";

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable must be set in production");
  }
  console.warn("⚠️  WARNING: Using insecure default JWT_SECRET in development. Set JWT_SECRET environment variable for production!");
  return "insecure-dev-secret-CHANGE-ME";
})();

export interface HybridAuthRequest extends Request {
  userId?: string;
  userRole?: string;
  isTeamMember?: boolean;
  teamMember?: {
    memberId: string;
    teamId: string;
    userId: string;
    roleId: string;
    permissions: any;
    isAdminTeam?: boolean;
  };
}

/**
 * Hybrid authentication middleware that accepts:
 * 1. Regular JWT tokens (from user login)
 * 2. Team member session tokens (from team member login) - if Team Management plugin is installed
 * 
 * For team members, req.userId is set to the parent user's ID
 * so existing routes return the master account's data.
 */
export async function authenticateHybrid(req: HybridAuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  // First, try to validate as a regular JWT token
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.isTeamMember = false;
    
    // Also set req.user for backward compatibility
    (req as any).user = {
      id: decoded.userId,
      role: decoded.role
    };
    
    return next();
  } catch (jwtError) {
    // JWT verification failed, try team member authentication if plugin is installed
  }

  // Only try team authentication if plugin is installed
  if (isTeamManagementInstalled()) {
    // Try user team member session
    try {
      const teamMember = await validateUserTeamSession(token);
      if (teamMember) {
        // Set userId to the parent user's ID so existing routes work
        req.userId = teamMember.userId.toString();
        req.userRole = 'user';
        req.isTeamMember = true;
        req.teamMember = {
          memberId: teamMember.memberId,
          teamId: teamMember.teamId,
          userId: teamMember.userId.toString(),
          roleId: teamMember.roleId,
          permissions: teamMember.permissions,
          isAdminTeam: false,
        };
        
        // Also set req.user for backward compatibility
        (req as any).user = {
          id: teamMember.userId,
          role: 'user'
        };
        
        console.log(`[HybridAuth] Team member ${teamMember.memberId} authenticated as user ${teamMember.userId}`);
        return next();
      }
    } catch (teamError) {
      // Team member validation failed, try admin team
    }

    // Try admin team member session
    try {
      const adminMember = await validateAdminTeamSession(token);
      if (adminMember) {
        // For admin team members, they're accessing admin routes
        req.userId = adminMember.adminId;
        req.userRole = 'admin';
        req.isTeamMember = true;
        req.teamMember = {
          memberId: adminMember.memberId,
          teamId: adminMember.teamId,
          userId: adminMember.adminId,
          roleId: adminMember.roleId,
          permissions: adminMember.permissions,
          isAdminTeam: true,
        };
        
        // Also set req.user for backward compatibility
        (req as any).user = {
          id: adminMember.adminId,
          role: 'admin'
        };
        
        console.log(`[HybridAuth] Admin team member ${adminMember.memberId} authenticated`);
        return next();
      }
    } catch (adminTeamError) {
      // Admin team validation failed
    }
  }

  // All authentication methods failed
  return res.status(401).json({ error: "Invalid or expired token" });
}

/**
 * Optional hybrid authentication - doesn't fail if no token provided
 * Useful for routes that support both authenticated and unauthenticated access
 */
export async function optionalHybridAuth(req: HybridAuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next();
  }

  // First, try to validate as a regular JWT token
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.isTeamMember = false;
    
    (req as any).user = {
      id: decoded.userId,
      role: decoded.role
    };
    
    return next();
  } catch (jwtError) {
    // Try team auth if plugin installed
  }

  // Only try team authentication if plugin is installed
  if (isTeamManagementInstalled()) {
    // Try user team member session
    try {
      const teamMember = await validateUserTeamSession(token);
      if (teamMember) {
        req.userId = teamMember.userId.toString();
        req.userRole = 'user';
        req.isTeamMember = true;
        req.teamMember = {
          memberId: teamMember.memberId,
          teamId: teamMember.teamId,
          userId: teamMember.userId.toString(),
          roleId: teamMember.roleId,
          permissions: teamMember.permissions,
          isAdminTeam: false,
        };
        
        (req as any).user = {
          id: teamMember.userId,
          role: 'user'
        };
        
        return next();
      }
    } catch (error) {
      // Continue
    }

    // Try admin team member session
    try {
      const adminMember = await validateAdminTeamSession(token);
      if (adminMember) {
        req.userId = adminMember.adminId;
        req.userRole = 'admin';
        req.isTeamMember = true;
        req.teamMember = {
          memberId: adminMember.memberId,
          teamId: adminMember.teamId,
          userId: adminMember.adminId,
          roleId: adminMember.roleId,
          permissions: adminMember.permissions,
          isAdminTeam: true,
        };
        
        (req as any).user = {
          id: adminMember.adminId,
          role: 'admin'
        };
        
        return next();
      }
    } catch (error) {
      // Continue
    }
  }

  // No valid token, continue without auth
  next();
}

/**
 * Team section permission guard for user-team members.
 *
 * Must run AFTER authenticateHybrid. Owners (plain JWT users) and admin-team
 * members pass through untouched; user-team members must hold the HTTP
 * method's action (GET->read, POST->create, PATCH/PUT->update, DELETE->delete)
 * on at least one subsection of `section` in their role's team_permissions.
 *
 * @param section     Section id from the Team Management plugin's PERMISSION_SECTIONS
 * @param pathPrefix  Optional: only enforce when req.path starts with this prefix
 *                    (used on broad mounts such as the "/api" widget router).
 */
export function enforceTeamSectionPermission(section: string, pathPrefix?: string) {
  return (req: HybridAuthRequest, res: Response, next: NextFunction) => {
    if (!req.isTeamMember || !req.teamMember || req.teamMember.isAdminTeam) {
      return next();
    }
    if (pathPrefix && !req.path.startsWith(pathPrefix)) {
      return next();
    }

    const method = req.method.toUpperCase();
    const flag: 'canCreate' | 'canRead' | 'canUpdate' | 'canDelete' =
      method === 'POST' ? 'canCreate'
      : method === 'PATCH' || method === 'PUT' ? 'canUpdate'
      : method === 'DELETE' ? 'canDelete'
      : 'canRead';
    const action = flag.replace('can', '').toLowerCase();

    const perms = req.teamMember.permissions;
    let allowed = false;
    if (Array.isArray(perms)) {
      allowed = perms.some((p: any) => p && p.section === section && p[flag] === true);
    } else if (perms && typeof perms === 'object' && perms[section] && typeof perms[section] === 'object') {
      allowed = Object.values(perms[section] as Record<string, any>).some(
        (sub: any) => sub && typeof sub === 'object' && sub[flag] === true
      );
    }

    if (!allowed) {
      return res.status(403).json({
        error: 'Permission denied',
        details: `Required team permission: ${section}.${action}`,
      });
    }
    next();
  };
}

/**
 * authenticateHybrid followed by enforceTeamSectionPermission, as ONE handler.
 * For route factories that accept a single auth middleware argument.
 */
export function authenticateHybridWithTeamSection(section: string, pathPrefix?: string) {
  const guard = enforceTeamSectionPermission(section, pathPrefix);
  return (req: HybridAuthRequest, res: Response, next: NextFunction) => {
    void authenticateHybrid(req, res, (err?: any) => {
      if (err) return next(err);
      guard(req, res, next);
    });
  };
}

export default authenticateHybrid;
