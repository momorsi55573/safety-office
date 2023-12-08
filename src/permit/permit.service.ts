import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import { DbService } from 'src/db/db.service';
import { CreatePermitDto } from 'src/utils/dto';
import toStream = require('buffer-to-stream');

@Injectable()
export class PermitService {
  constructor(private db: DbService) {}

  async addPermit(dto: CreatePermitDto, user, files) {
    try {
      const image = await this.uploadImage(files).catch((e) => {
        throw e;
      });

      if (typeof files.length === 'undefined') {
        const permit = await this.db.permit.create({
          data: {
            ids: image.public_id.split(),
            imagpath: image.secure_url.split(),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            equipments: dto.equipments,
            description: dto.description,
            workInExcavation: dto.workInExcavation,
            workInConfinedSpace: dto.workInConfinedSpace,
            fallFromHight: dto.fallFromHight,
            fumes: dto.fumes,
            healthHazards: dto.healthHazards,
            electricalHazards: dto.electricalHazards,
            fireHazards: dto.fireHazards,
            protrudingParts: dto.protrudingParts,
            fallingObjects: dto.fallingObjects,
            noise: dto.noise,
            heat: dto.heat,
            vibration: dto.vibration,
            adversWeather: dto.adversWeather,
            flyingParticles: dto.flyingParticles,
            movingVehicle: dto.movingVehicle,
            workPlaceInspected: dto.workPlaceInspected,
            equipmentsInspected: dto.equipmentsInspected,
            riskAssessmentDiscussed: dto.riskAssessmentDiscussed,
            PPEGood: dto.PPEGood,
            workSteps: dto.workSteps,
            tripping: dto.tripping,
            hardBreakat: dto.hardBreakat,
            laborsGood: dto.laborsGood,
            dangerMeeting: dto.dangerMeeting,
            fireFightersExist: dto.fireFightersExist,
            noConflict: dto.noConflict,
            isolated: dto.isolated,
            dealtWithPoisioned: dto.dealtWithPoisioned,
            markers: dto.markers,
            mandatoryPPE: dto.mandatoryPPE.split(' '),
            additionalPPE: dto.additionalPPE.split(' '),
            siteCondition: dto.siteCondition.split(' '),
            additionalSafty: dto.additionalSafty,
            documents: dto.documents.split(' '),
            issuedBy: user.userId,
            status: 'pending',
          },
        });
        return permit;
      } else {
        const permit = await this.db.permit.create({
          data: {
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            equipments: dto.equipments,
            description: dto.description,
            workInExcavation: dto.workInExcavation,
            workInConfinedSpace: dto.workInConfinedSpace,
            fallFromHight: dto.fallFromHight,
            fumes: dto.fumes,
            healthHazards: dto.healthHazards,
            electricalHazards: dto.electricalHazards,
            fireHazards: dto.fireHazards,
            protrudingParts: dto.protrudingParts,
            fallingObjects: dto.fallingObjects,
            noise: dto.noise,
            heat: dto.heat,
            vibration: dto.vibration,
            adversWeather: dto.adversWeather,
            flyingParticles: dto.flyingParticles,
            movingVehicle: dto.movingVehicle,
            workPlaceInspected: dto.workPlaceInspected,
            equipmentsInspected: dto.equipmentsInspected,
            riskAssessmentDiscussed: dto.riskAssessmentDiscussed,
            PPEGood: dto.PPEGood,
            workSteps: dto.workSteps,
            tripping: dto.tripping,
            hardBreakat: dto.hardBreakat,
            laborsGood: dto.laborsGood,
            dangerMeeting: dto.dangerMeeting,
            fireFightersExist: dto.fireFightersExist,
            noConflict: dto.noConflict,
            isolated: dto.isolated,
            dealtWithPoisioned: dto.dealtWithPoisioned,
            markers: dto.markers,
            mandatoryPPE: dto.mandatoryPPE.split(' '),
            additionalPPE: dto.additionalPPE.split(' '),
            siteCondition: dto.siteCondition.split(' '),
            additionalSafty: dto.additionalSafty,
            documents: dto.documents.split(' '),
            issuedBy: user.userId,
            status: 'pending',
          },
        });
        return permit;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async uploadImage(
    files,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise<UploadApiResponse | UploadApiErrorResponse>(
      (resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });

        if (typeof files.length === 'undefined') {
          toStream(files.buffer).pipe(uploadStream);
        } else {
          toStream(files.forEach((file) => file.buffer)).pipe(uploadStream);
        }
      },
    );
  }
}
