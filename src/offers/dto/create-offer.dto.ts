import { EmploymentType } from "@prisma/client";
export class CreateOfferDto {
  applicationId: string;
  title: string;
  employmentType: EmploymentType;

  baseSalary?: number;
  bonus?: number;
  equity?: number;
  currency?: string;

  startDate?: string;
  location?: string;
  notes?: string;
}
