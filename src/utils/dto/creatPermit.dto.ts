/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermitDto {
  @IsNotEmpty()
  permitType: string;
  @IsString()
  @IsNotEmpty()
  issuedTo: string;
  @IsString()
  @IsNotEmpty()
  area: string;
  @IsString()
  @IsNotEmpty()
  location: string;
  @IsString()
  @IsNotEmpty()
  equipments: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  workInExcavation: string;
  @IsNotEmpty()
  workInConfinedSpace: string;
  @IsNotEmpty()
  fallFromHight: string;
  @IsNotEmpty()
  fumes: string;
  @IsNotEmpty()
  healthHazards: string;
  @IsNotEmpty()
  electricalHazards: string;
  @IsNotEmpty()
  fireHazards: string;
  @IsNotEmpty()
  protrudingParts: string;
  @IsNotEmpty()
  fallingObjects: string;
  @IsNotEmpty()
  noise: string;
  @IsNotEmpty()
  heat: string;
  @IsNotEmpty()
  vibration: string;
  @IsNotEmpty()
  adversWeather: string;
  @IsNotEmpty()
  flyingParticles: string;
  @IsNotEmpty()
  tripping: string;
  @IsNotEmpty()
  movingVehicle: string;
  @IsNotEmpty()
  workPlaceInspected: string;
  @IsNotEmpty()
  equipmentsInspected: string;
  @IsNotEmpty()
  riskAssessmentDiscussed: string;
  @IsNotEmpty()
  PPEGood: string;
  @IsNotEmpty()
  workSteps: string;
  @IsNotEmpty()
  hardBreakat: string;
  @IsNotEmpty()
  laborsGood: string;
  @IsNotEmpty()
  dangerMeeting: string;
  @IsNotEmpty()
  fireFightersExist: string;
  @IsNotEmpty()
  noConflict: string;
  @IsNotEmpty()
  isolated: string;
  @IsNotEmpty()
  dealtWithPoisioned: string;
  @IsNotEmpty()
  markers: string;
  @IsNotEmpty()
  mandatoryPPE: string;
  @IsNotEmpty()
  additionalPPE: string;
  @IsNotEmpty()
  siteCondition: string;
  additionalSafty: string;
  @IsNotEmpty()
  documents: string;
  
}
