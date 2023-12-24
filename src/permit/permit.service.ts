import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import { DbService } from 'src/db/db.service';
import toStream = require('buffer-to-stream');

@Injectable()
export class PermitService {
  constructor(private db: DbService) {}

  async createColdWorkPermit(dto, user, file) {
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
            numOfWorkers: +dto.numOfWorkers,
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
            additionalSafety: dto.additionalSafety,
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
            numOfWorkers: +dto.numOfWorkers,
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
            additionalSafety: dto.additionalSafety,
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

  async createExcavationWorkPermit(dto, user, file) {
    let additionalPPE = dto.additionalPPE;
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
            numOfWorkers: +dto.numOfWorkers,
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
            exLength: dto.exLength,
            exWidth: dto.exWidth,
            exDepth: dto.exDepth,
            protectionAgainstCollapse: dto.protectionAgainstCollapse,
            spolNotIn: dto.spolNotIn,
            exAccess: dto.exAccess,
            guardrial: dto.guardrial,
            exEntry: dto.exEntry,
            exJHA: dto.exJHA,
            exBarricaded: dto.exBarricaded,
            exLicense: dto.exLicense,
            mandatoryPPE,
            additionalPPE,
            additionalSafety: dto.additionalSafety,
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
            numOfWorkers: +dto.numOfWorkers,
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
            exLength: dto.exLength,
            exWidth: dto.exWidth,
            exDepth: dto.exDepth,
            protectionAgainstCollapse: dto.protectionAgainstCollapse,
            spolNotIn: dto.spolNotIn,
            exAccess: dto.exAccess,
            guardrial: dto.guardrial,
            exEntry: dto.exEntry,
            exJHA: dto.exJHA,
            exBarricaded: dto.exBarricaded,
            exLicense: dto.exLicense,
            mandatoryPPE,
            additionalPPE,
            additionalSafety: dto.additionalSafety,
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

  async createElecterecalWorkPermit(dto, user, file) {
    let additionalPPE = dto.additionalPPE;
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
            numOfWorkers: +dto.numOfWorkers,
            power: dto.power,
            voltageDetection: dto.voltageDetection,
            loto: dto.loto,
            earthingProvided: dto.earthingProvided,
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
            additionalSafety: dto.additionalSafety,
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
            numOfWorkers: +dto.numOfWorkers,
            power: dto.power,
            loto: dto.loto,
            earthingProvided: dto.earthingProvided,
            voltageDetection: dto.voltageDetection,
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
            additionalSafety: dto.additionalSafety,
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

  async createConfinedSpaceEntryPermit(dto, user, file) {
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
            numOfWorkers: +dto.numOfWorkers,
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
            additionalSafety: dto.additionalSafety,
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
            numOfWorkers: +dto.numOfWorkers,
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
            additionalSafety: dto.additionalSafety,
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

  async createHotWorkPermit(dto, user, file) {
    let additionalPPE = dto.additionalPPE;
    let typeOfWork = dto.typeOfWork;
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
    if (typeof typeOfWork === 'string') {
      typeOfWork = [typeOfWork];
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
            numOfWorkers: +dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            fireWatcher: dto.fireWatcher,
            description: dto.description,
            hazardsOfWork,
            measuresTaken,
            workPlaceInspected: dto.workPlaceInspected,
            equipmentsInspected: dto.equipmentsInspected,
            riskAssessmentDiscussed: dto.riskAssessmentDiscussed,
            PPEGood: dto.PPEGood,
            hardBreakat: dto.hardBreakat,
            laborsGood: dto.laborsGood,
            dangerMeeting: dto.dangerMeeting,
            elecIsolated: dto.elecIsolated,
            hotMV: dto.hotMV,
            hotEP: dto.hotEP,
            hotOD: dto.hotOD,
            hotCP: dto.hotCP,
            hotFW: dto.hotFW,
            hotFWM: dto.hotFWM,
            isolated: dto.isolated,
            dealtWithPoisioned: dto.dealtWithPoisioned,
            markers: dto.markers,
            mandatoryPPE,
            additionalPPE,
            typeOfWork,
            additionalSafety: dto.additionalSafety,
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
            numOfWorkers: +dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            fireWatcher: dto.fireWatcher,
            description: dto.description,
            hazardsOfWork,
            measuresTaken,
            workPlaceInspected: dto.workPlaceInspected,
            equipmentsInspected: dto.equipmentsInspected,
            riskAssessmentDiscussed: dto.riskAssessmentDiscussed,
            PPEGood: dto.PPEGood,
            hardBreakat: dto.hardBreakat,
            laborsGood: dto.laborsGood,
            dangerMeeting: dto.dangerMeeting,
            elecIsolated: dto.elecIsolated,
            hotMV: dto.hotMV,
            hotEP: dto.hotEP,
            hotOD: dto.hotOD,
            hotCP: dto.hotCP,
            hotFW: dto.hotFW,
            hotFWM: dto.hotFWM,
            isolated: dto.isolated,
            dealtWithPoisioned: dto.dealtWithPoisioned,
            markers: dto.markers,
            mandatoryPPE,
            additionalPPE,
            typeOfWork,
            additionalSafety: dto.additionalSafety,
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

  async createLiftingOperationPermit(dto, user, file) {
    let additionalPPE = dto.additionalPPE;
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
            numOfWorkers: +dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            description: dto.description,
            craneType: dto.craneType,
            craneCapacity: dto.craneCapacity,
            equipmentNo: dto.equipmentNo,
            preLift: dto.preLift,
            craneInspection: dto.craneInspection,
            dailyVisual: dto.dailyVisual,
            safetyDevices: dto.safetyDevices,
            windSpeed: dto.windSpeed,
            precautionsOut: dto.precautionsOut,
            riggingTools: dto.riggingTools,
            properAngel: dto.properAngel,
            loadStable: dto.loadStable,
            hazardsOfWork,
            measuresTaken,
            mandatoryPPE,
            additionalPPE,
            additionalSafety: dto.additionalSafety,
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
            numOfWorkers: +dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            description: dto.description,
            craneType: dto.craneType,
            craneCapacity: dto.craneCapacity,
            equipmentNo: dto.equipmentNo,
            preLift: dto.preLift,
            craneInspection: dto.craneInspection,
            dailyVisual: dto.dailyVisual,
            safetyDevices: dto.safetyDevices,
            windSpeed: dto.windSpeed,
            precautionsOut: dto.precautionsOut,
            riggingTools: dto.riggingTools,
            properAngel: dto.properAngel,
            loadStable: dto.loadStable,
            hazardsOfWork,
            measuresTaken,
            mandatoryPPE,
            additionalPPE,
            additionalSafety: dto.additionalSafety,
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

  async createWorkAtHightPermit(dto, user, file) {
    let additionalPPE = dto.additionalPPE;
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
            numOfWorkers: +dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            description: dto.description,
            alternativeWork: dto.alternativeWork,
            personsCompetent: dto.personsCompetent,
            energySources: dto.energySources,
            jsa: dto.jsa,
            areaSuitable: dto.areaSuitable,
            slippery: dto.slippery,
            handrails: dto.handrails,
            temporaryHandrails: dto.temporaryHandrails,
            tbt: dto.tbt,
            fallArrest: dto.fallArrest,
            harness: dto.harness,
            rescue: dto.rescue,
            weather: dto.weather,
            means: dto.means,
            barrcaded: dto.barrcaded,
            ducts: dto.ducts,
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
            additionalSafety: dto.additionalSafety,
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
            numOfWorkers: +dto.numOfWorkers,
            ids: image.map((image) => image.public_id),
            imagpath: image.map((image) => image.secure_url),
            area: dto.area,
            permitType: dto.permitType,
            issuedTo: dto.issuedTo,
            location: dto.location,
            description: dto.description,
            alternativeWork: dto.alternativeWork,
            personsCompetent: dto.personsCompetent,
            energySources: dto.energySources,
            jsa: dto.jsa,
            areaSuitable: dto.areaSuitable,
            slippery: dto.slippery,
            handrails: dto.handrails,
            temporaryHandrails: dto.temporaryHandrails,
            tbt: dto.tbt,
            fallArrest: dto.fallArrest,
            harness: dto.harness,
            rescue: dto.rescue,
            weather: dto.weather,
            means: dto.means,
            barrcaded: dto.barrcaded,
            ducts: dto.ducts,
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
            additionalSafety: dto.additionalSafety,
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
    return await this.db.permit.findMany({
      take: 200,
    });
  }

  async getMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        issuedBy,
      },
    });
  }
  async getCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        issuedTo,
      },
    });
  }
  async searchAllPermits(startDate) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        startDate,
      },
    });
  }
  async searchMyPermits(issuedBy, startDate) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        startDate,
        issuedBy,
      },
    });
  }

  async searchCompanyPermits(issuedTo, startDate) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        startDate,
        issuedTo,
      },
    });
  }

  async pendingAllPermits() {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'pending',
      },
    });
  }
  async pendingMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'pending',
        issuedBy,
      },
    });
  }

  async pendingCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'pending',
        issuedTo,
      },
    });
  }

  async activeAllPermits() {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'active',
      },
    });
  }
  async activeMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'active',
        issuedBy,
      },
    });
  }

  async activeCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'active',
        issuedTo,
      },
    });
  }

  async stoppedAllPermits() {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'stopped',
      },
    });
  }
  async stoppedMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'stopped',
        issuedBy,
      },
    });
  }

  async stoppedCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'stopped',
        issuedTo,
      },
    });
  }

  async expiredAllPermits() {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'expired',
      },
    });
  }
  async expiredMyPermits(issuedBy) {
    return await this.db.permit.findMany({
      take: 200,
      where: {
        status: 'expired',
        issuedBy,
      },
    });
  }

  async expiredCompanyPermits(issuedTo) {
    return await this.db.permit.findMany({
      take: 200,
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

  async extend(id, dto, user) {
    await this.db.permit.update({
      where: {
        id,
      },
      data: {
        status: 'pending',
      },
    });
    if (user.company !== 'ZTPC') {
      return await this.db.extend.create({
        data: {
          per: id,
          expiredAt: dto.expiredAt,
          subConstructionRep: await user.userName,
        },
      });
    } else {
      return await this.db.extend.create({
        data: {
          per: id,
          expiredAt: dto.expiredAt,
          constructionRep: await user.userName,
        },
      });
    }
  }

  async renew(id, dto, user) {
    await this.db.permit.update({
      where: {
        id,
      },
      data: {
        status: 'pending',
      },
    });
    if (user.company !== 'ZTPC') {
      return await this.db.renew.create({
        data: {
          per: id,
          endDate: dto.endDate,
          subConstructionRep: await user.userName,
        },
      });
    } else {
      return await this.db.renew.create({
        data: {
          per: id,
          endDate: dto.endDate,
          constructionRep: await user.userName,
        },
      });
    }
  }

  async getTest(id) {
    return await this.db.test.findMany({
      take: 200,
      where: {
        per: id,
      },
    });
  }

  async re(id) {
    return await this.db.renew.findMany({
      where: {
        per: id,
      },
    });
  }

  async ex(id) {
    return await this.db.extend.findMany({
      where: {
        per: id,
      },
    });
  }

  async addTest(id, dto) {
    return await this.db.test.create({
      data: {
        per: id,
        testDate: dto.testDate,
        testTime: dto.testTime,
        testDetectorName: dto.testDetectorName,
        testLEL: dto.testLEL,
        testO2: dto.testO2,
        testCO: dto.testCO,
        testH2S: dto.testH2S,
      },
    });
  }

  async expire() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = now.getFullYear();
    let hh: any = now.getHours();
    if (hh < 10) {
      hh = +String(0) + String(hh);
    }
    const min = now.getMinutes();
    const time = String(hh + ':' + min);
    const today = dd + '-' + mm + '-' + yyyy;
    const permits = await this.db.permit.findMany();

    permits.forEach(async (permit) => {
      const ex = await this.db.extend.findMany({
        where: {
          per: permit.id,
        },
      });
      const re = await this.db.renew.findMany({
        where: {
          per: permit.id,
        },
      });

      if (
        (permit.status !== 'expired' &&
          permit.endDate < today &&
          re.length === 0) ||
        (permit.status !== 'expired' &&
          permit.expiredAt < time &&
          permit.endDate <= today &&
          ex.length === 0 &&
          re.length === 0) ||
        (permit.status !== 'expired' &&
          re.length > 0 &&
          re[re.length - 1].endDate < today) ||
        (ex.length > 0 &&
          permit.status !== 'expired' &&
          ex[ex.length - 1].expiredAt < time &&
          re.length === 0) ||
        (ex.length > 0 &&
          permit.status !== 'expired' &&
          ex[ex.length - 1].expiredAt < time &&
          re.length > 0 &&
          re[re.length - 1].endDate <= today) ||
        (ex.length === 0 &&
          permit.status !== 'expired' &&
          permit.expiredAt < time)
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
          status: 'active',
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

  async approveEX(id, user) {
    if (user.company === 'ZTPC' && user.role === 'Officer') {
      return await this.db.extend.update({
        where: {
          id,
        },
        data: {
          HSERep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.company !== 'ZTPC' && user.role === 'Officer') {
      return await this.db.extend.update({
        where: {
          id,
        },
        data: {
          subHSERep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.company === 'ZTPC' && user.role === 'ENG') {
      return await this.db.extend.update({
        where: {
          id,
        },
        data: {
          constructionRep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.role === 'Moderator') {
      const extend = await this.db.extend.findUnique({
        where: {
          id,
        },
      });
      await this.db.permit.update({
        where: {
          id: extend.per,
        },
        data: {
          status: 'active',
        },
      });
      return await this.db.extend.update({
        where: {
          id,
        },
        data: {
          PTWCordinator: `approved by ${user.userName}`,
        },
      });
    }
  }

  async rejectEX(id, user) {
    if (user.company === 'ZTPC' && user.role === 'Officer') {
      return await this.db.extend.update({
        where: {
          id,
        },
        data: {
          HSERep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.company !== 'ZTPC' && user.role === 'Officer') {
      return await this.db.extend.update({
        where: {
          id,
        },
        data: {
          subHSERep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.company === 'ZTPC' && user.role === 'ENG') {
      return await this.db.extend.update({
        where: {
          id,
        },
        data: {
          constructionRep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.role === 'Moderator') {
      const extend = await this.db.extend.findUnique({
        where: {
          id,
        },
      });
      await this.db.permit.update({
        where: {
          id: extend.per,
        },
        data: {
          status: 'rejected',
        },
      });
      return await this.db.extend.update({
        where: {
          id,
        },
        data: {
          PTWCordinator: `rejected by ${user.userName}`,
        },
      });
    }
  }

  async approveRE(id, user) {
    if (user.company === 'ZTPC' && user.role === 'Officer') {
      return await this.db.renew.update({
        where: {
          id,
        },
        data: {
          HSERep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.company !== 'ZTPC' && user.role === 'Officer') {
      return await this.db.renew.update({
        where: {
          id,
        },
        data: {
          subHSERep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.company === 'ZTPC' && user.role === 'ENG') {
      return await this.db.renew.update({
        where: {
          id,
        },
        data: {
          constructionRep: `approved by ${user.userName}`,
        },
      });
    }
    if (user.role === 'Moderator') {
      const renew = await this.db.renew.findUnique({
        where: {
          id,
        },
      });
      await this.db.permit.update({
        where: {
          id: renew.per,
        },
        data: {
          status: 'active',
        },
      });
      return await this.db.renew.update({
        where: {
          id,
        },
        data: {
          PTWCordinator: `approved by ${user.userName}`,
        },
      });
    }
  }

  async rejectRE(id, user) {
    if (user.company === 'ZTPC' && user.role === 'Officer') {
      return await this.db.renew.update({
        where: {
          id,
        },
        data: {
          HSERep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.company !== 'ZTPC' && user.role === 'Officer') {
      return await this.db.renew.update({
        where: {
          id,
        },
        data: {
          subHSERep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.company === 'ZTPC' && user.role === 'ENG') {
      return await this.db.renew.update({
        where: {
          id,
        },
        data: {
          constructionRep: `rejected by ${user.userName}`,
        },
      });
    }
    if (user.role === 'Moderator') {
      const renew = await this.db.renew.findUnique({
        where: {
          id,
        },
      });
      await this.db.permit.update({
        where: {
          id: renew.per,
        },
        data: {
          status: 'rejected',
        },
      });
      return await this.db.renew.update({
        where: {
          id,
        },
        data: {
          PTWCordinator: `rejected by ${user.userName}`,
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
