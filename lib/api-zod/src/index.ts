export * from "./generated/api";
export type { 
  ContactMessage, 
  CreateContactBody, 
  DaycareStats, 
  Enrollment, 
  EnrollmentStatus, 
  Event, 
  EventType, 
  GalleryPhoto, 
  GalleryPhotoCategory, 
  HealthStatus, 
  Program, 
  StaffMember, 
  Testimonial 
} from "./generated/types/index";

// Explicitly re-export types for the schemas that clash
import type { CreateEnrollmentBody as CreateEnrollmentBodyType } from "./generated/types/index";
import type { CreateProgramBody as CreateProgramBodyType } from "./generated/types/index";

export type { CreateEnrollmentBodyType, CreateProgramBodyType };
