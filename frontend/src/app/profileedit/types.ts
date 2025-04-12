export interface UserProfile {
    firstName: string;
    lastName: string;
    bio: string;
    birthDate: string;
    language: string;
    city: string;
    country: string;
    relationship: string;
  }
  
  export interface WorkExperience {
    title: string;
    organization: string;
    startDate: string;
    endDate: string;
  }
  
  export interface Education {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
  }
  
  export interface CompanyOverview {
    description: string;
    website: string;
    phone: string;
    language: string;
    numEmployees: string;
    numBW2Employees: string;
  }