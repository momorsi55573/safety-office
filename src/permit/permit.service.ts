import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import { DbService } from 'src/db/db.service';
import toStream = require('buffer-to-stream');

@Injectable()
export class PermitService {
  constructor(private db: DbService) {}

  async creatColdWorkPermit(dto, user, file) {
    let additionalPPE = dto.additionalPPE;
    let siteCondition = dto.siteCondition;
    let mandatoryPPE = dto.mandatoryPPE;
    let documents = dto.documents;
    let hazardsOfWork = dto.hazardsOfWork;
    let measuresTaken = dto.measuresTaken;
    if (typeof hazardsOfWork === 'string') {
      hazardsOfWork = [hazardsOfWork];
    }
    if (typeof measuresTaken === 'string') {
      measuresTaken = [measuresTaken];
    }
    if (typeof additionalPPE === 'string') {
      additionalPPE = [additionalPPE];
    }
    if (typeof siteCondition === 'string') {
      siteCondition = [siteCondition];
    }
    if (typeof mandatoryPPE === 'string') {
      mandatoryPPE = [mandatoryPPE];
    }
    if (typeof documents === 'string') {
      documents = [documents];
    }
    try {
      const image = [];
      for (const doc of file) {
        const img = await this.uploadImage(doc).catch((e) => {
          throw e;
        });
        image.push(img);
      }
      if (user.company !== 'ZTPC') {
        const permit = await this.db.permit.create({
          data: {
            subConstructionRep: await user.userName,
            startDate: dto.startDate,
            endDate: dto.endDate,
            startAt: dto.startAt,
            expiredAt: dto.expiredAt,
            numOfWorkers: dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            equipments: dto.equipments,
            description: dto.description,
            hazardsOfWork,
            measuresTaken,
            workPlaceInspected: dto.workPlaceInspected,
            equipmentsInspected: dto.equipmentsInspected,
            riskAssessmentDiscussed: dto.riskAssessmentDiscussed,
            PPEGood: dto.PPEGood,
            workSteps: dto.workSteps,
            hardBreakat: dto.hardBreakat,
            laborsGood: dto.laborsGood,
            dangerMeeting: dto.dangerMeeting,
            fireFightersExist: dto.fireFightersExist,
            noConflict: dto.noConflict,
            isolated: dto.isolated,
            dealtWithPoisioned: dto.dealtWithPoisioned,
            markers: dto.markers,
            mandatoryPPE,
            additionalPPE,
            siteCondition,
            additionalSafty: dto.additionalSafty,
            documents,
            issuedBy: user.userId,
            status: 'pending',
          },
        });
        return permit;
      } else {
        const permit = await this.db.permit.create({
          data: {
            constructionRep: await user.userName,
            startDate: dto.startDate,
            endDate: dto.endDate,
            startAt: dto.startAt,
            expiredAt: dto.expiredAt,
            numOfWorkers: dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            equipments: dto.equipments,
            description: dto.description,
            hazardsOfWork,
            measuresTaken,
            workPlaceInspected: dto.workPlaceInspected,
            equipmentsInspected: dto.equipmentsInspected,
            riskAssessmentDiscussed: dto.riskAssessmentDiscussed,
            PPEGood: dto.PPEGood,
            workSteps: dto.workSteps,
            hardBreakat: dto.hardBreakat,
            laborsGood: dto.laborsGood,
            dangerMeeting: dto.dangerMeeting,
            fireFightersExist: dto.fireFightersExist,
            noConflict: dto.noConflict,
            isolated: dto.isolated,
            dealtWithPoisioned: dto.dealtWithPoisioned,
            markers: dto.markers,
            mandatoryPPE,
            additionalPPE,
            siteCondition,
            additionalSafty: dto.additionalSafty,
            documents,
            issuedBy: user.userId,
            status: 'pending',
          },
        });
        return permit;
      }
    } catch (e) {
      throw e;
    }
  }

  async creatConfinedSpaceEntryPermit(dto, user, file) {
    let additionalPPE = dto.additionalPPE;
    let siteCondition = dto.siteCondition;
    let mandatoryPPE = dto.mandatoryPPE;
    let documents = dto.documents;
    let hazardsOfWork = dto.hazardsOfWork;
    let measuresTaken = dto.measuresTaken;
    if (typeof hazardsOfWork === 'string') {
      hazardsOfWork = [hazardsOfWork];
    }
    if (typeof measuresTaken === 'string') {
      measuresTaken = [measuresTaken];
    }
    if (typeof additionalPPE === 'string') {
      additionalPPE = [additionalPPE];
    }
    if (typeof siteCondition === 'string') {
      siteCondition = [siteCondition];
    }
    if (typeof mandatoryPPE === 'string') {
      mandatoryPPE = [mandatoryPPE];
    }
    if (typeof documents === 'string') {
      documents = [documents];
    }
    try {
      const image = [];
      for (const doc of file) {
        const img = await this.uploadImage(doc).catch((e) => {
          throw e;
        });
        image.push(img);
      }
      if (user.company !== 'ZTPC') {
        const permit = await this.db.permit.create({
          data: {
            subConstructionRep: await user.userName,
            startDate: dto.startDate,
            endDate: dto.endDate,
            startAt: dto.startAt,
            expiredAt: dto.expiredAt,
            numOfWorkers: dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            equipments: dto.equipments,
            description: dto.description,
            hazardsOfWork,
            measuresTaken,
            desOfConfinedSpace: dto.desOfConfinedSpace,
            voltage: dto.voltage,
            watcherName: dto.watcherName,
            namesOfEnteringEmp: dto.namesOfEnteringEmp,
            mandatoryPPE,
            additionalPPE,
            confinedSpacePartOfSystem: dto.confinedSpacePartOfSystem,
            connectedElectrical: dto.connectedElectrical,
            gasTest: dto.gasTest,
            forcedVentilation: dto.forcedVentilation,
            confinedTraning: dto.confinedTraning,
            confinedAccess: dto.confinedAccess,
            watchman: dto.watchman,
            confinedBurning: dto.confinedBurning,
            riskAssessmentDiscussed: dto.riskAssessmentDiscussed,
            electricitySupply: dto.electricitySupply,
            adequateLighting: dto.adequateLighting,
            confinedAdditionalPPE: dto.confinedAdditionalPPE,
            additionalSafty: dto.additionalSafty,
            documents,
            issuedBy: user.userId,
            status: 'pending',
          },
        });
        return permit;
      } else {
        const permit = await this.db.permit.create({
          data: {
            constructionRep: await user.userName,
            startDate: dto.startDate,
            endDate: dto.endDate,
            startAt: dto.startAt,
            expiredAt: dto.expiredAt,
            numOfWorkers: dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            equipments: dto.equipments,
            description: dto.description,
            desOfConfinedSpace: dto.desOfConfinedSpace,
            voltage: dto.voltage,
            watcherName: dto.watcherName,
            namesOfEnteringEmp: dto.namesOfEnteringEmp,
            hazardsOfWork,
            measuresTaken,
            mandatoryPPE,
            additionalPPE,
            confinedSpacePartOfSystem: dto.confinedSpacePartOfSystem,
            connectedElectrical: dto.connectedElectrical,
            gasTest: dto.gasTest,
            forcedVentilation: dto.forcedVentilation,
            confinedTraning: dto.confinedTraning,
            confinedAccess: dto.confinedAccess,
            watchman: dto.watchman,
            confinedBurning: dto.confinedBurning,
            riskAssessmentDiscussed: dto.riskAssessmentDiscussed,
            electricitySupply: dto.electricitySupply,
            adequateLighting: dto.adequateLighting,
            confinedAdditionalPPE: dto.confinedAdditionalPPE,
            additionalSafty: dto.additionalSafty,
            documents,
            issuedBy: user.userId,
            status: 'pending',
          },
        });
        return permit;
      }
    } catch (e) {
      throw e;
    }
  }

  async getAllPermits() {
    return await this.db.permit.findMany();
  }

  async getMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      where: {
        issuedBy,
      },
    });
  }
  async getCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      where: {
        issuedTo,
      },
    });
  }
  async searchAllPermits(startDate) {
    return await this.db.permit.findMany({
      where: {
        startDate,
      },
    });
  }
  async searchMyPermits(issuedBy, startDate) {
    return await this.db.permit.findMany({
      where: {
        startDate,
        issuedBy,
      },
    });
  }

  async searchCompanyPermits(issuedTo, startDate) {
    return await this.db.permit.findMany({
      where: {
        startDate,
        issuedTo,
      },
    });
  }

  async pendingAllPermits() {
    return await this.db.permit.findMany({
      where: {
        status: 'pending',
      },
    });
  }
  async pendingMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      where: {
        status: 'pending',
        issuedBy,
      },
    });
  }

  async pendingCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      where: {
        status: 'pending',
        issuedTo,
      },
    });
  }

  async activeAllPermits() {
    return await this.db.permit.findMany({
      where: {
        status: 'approved',
      },
    });
  }
  async activeMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      where: {
        status: 'approved',
        issuedBy,
      },
    });
  }

  async activeCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      where: {
        status: 'approved',
        issuedTo,
      },
    });
  }

  async stoppedAllPermits() {
    return await this.db.permit.findMany({
      where: {
        status: 'stopped',
      },
    });
  }
  async stoppedMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      where: {
        status: 'stopped',
        issuedBy,
      },
    });
  }

  async stoppedCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      where: {
        status: 'stopped',
        issuedTo,
      },
    });
  }

  async expiredAllPermits() {
    return await this.db.permit.findMany({
      where: {
        status: 'expired',
      },
    });
  }
  async expiredMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      where: {
        status: 'expired',
        issuedBy,
      },
    });
  }

  async expiredCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      where: {
        status: 'expired',
        issuedTo,
      },
    });
  }

  async getPermit(id) {
    return await this.db.permit.findUnique({
      where: {
        id,
      },
    });
  }

  async stop(id, user) {
    return await this.db.permit.update({
      where: {
        id,
      },
      data: {
        PTWCordinator: `stopped by ${user.userName}`,
        status: 'stopped',
      },
    });
  }

  async expire() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = now.getFullYear();
    const hh = now.getHours();
    const min = now.getMinutes();
    const time = hh + ':' + min;

    const today = dd + '-' + mm + '-' + yyyy;
    const permits = await this.db.permit.findMany();
    permits.forEach(async (permit) => {
      if (
        (permit.status !== 'expired' && permit.endDate < today) ||
        (permit.status !== 'expired' &&
          permit.expiredAt < time &&
          permit.endDate <= today)
      ) {
        return await this.db.permit.update({
          where: {
            id: permit.id,
          },
          data: {
            status: 'expired',
          },
        });
      }
    });
  }

  async approve(id, user) {
    if (user.company === 'ZTPC' && user.role === 'Officer') {
      return await this.db.permit.update({
        where: {
          id,
        },
        data: {
          HSERep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.company !== 'ZTPC' && user.role === 'Officer') {
      return await this.db.permit.update({
        where: {
          id,
        },
        data: {
          subHSERep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.company === 'ZTPC' && user.role === 'ENG') {
      return await this.db.permit.update({
        where: {
          id,
        },
        data: {
          constructionRep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.role === 'Moderator') {
      return await this.db.permit.update({
        where: {
          id,
        },
        data: {
          PTWCordinator: `approved by ${user.userName}`,
          status: 'approved',
        },
      });
    }
  }

  async reject(id, user) {
    if (user.company === 'ZTPC' && user.role === 'Officer') {
      return await this.db.permit.update({
        where: {
          id,
        },
        data: {
          HSERep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.company !== 'ZTPC' && user.role === 'Officer') {
      return await this.db.permit.update({
        where: {
          id,
        },
        data: {
          subHSERep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.company === 'ZTPC' && user.role === 'ENG') {
      return await this.db.permit.update({
        where: {
          id,
        },
        data: {
          constructionRep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.role === 'Moderator') {
      return await this.db.permit.update({
        where: {
          id,
        },
        data: {
          PTWCordinator: `rejected by ${user.userName}`,
          status: 'rejected',
        },
      });
    }
  }

  async uploadImage(file): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return await new Promise<UploadApiResponse | UploadApiErrorResponse>(
      async (resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });

        toStream(file.buffer).pipe(uploadStream);
      },
    );
  }
}
