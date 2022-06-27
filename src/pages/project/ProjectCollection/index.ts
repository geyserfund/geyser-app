import { IProjectBlock, IProjectDetail, IProjectUpdate } from '../../../interfaces';
import { Craig } from './Craig';
import { King } from './King';
import { Toni } from './Toni';
import { Josias } from './Josias';
import { Anita } from './Anita';
import { Yeferson } from './Yeferson';
import { Pedro } from './Pedro';
import { Apata } from './Apata';
import { Matteo } from './Matteo';
import { Anonymal } from './Anonymal';
import { Rapaygo } from './Rapaygo';
import { Paco } from './Paco';
import { BitcoinRacing } from './BitcoinRacing';

export interface IProjectData {
	projectBlocks: IProjectBlock[]
	projectDetails: IProjectDetail
	projectName: string
	projectUpdates?: IProjectUpdate[]
}

export interface IProjectColl {
	[key: string]: IProjectData
}

const ProjectColl: IProjectColl = {
	[Craig.projectName]: Craig,
	[King.projectName]: King,
	[Toni.projectName]: Toni,
	[Josias.projectName]: Josias,
	[Apata.projectName]: Apata,
	[Yeferson.projectName]: Yeferson,
	[Pedro.projectName]: Pedro,
	[Anita.projectName]: Anita,
	[Matteo.projectName]: Matteo,
	[Anonymal.projectName]: Anonymal,
	[Rapaygo.projectName]: Rapaygo,
	[Paco.projectName]: Paco,
	[BitcoinRacing.projectName]: BitcoinRacing,
};

export default ProjectColl;
