import { getIdentity } from './auth';
import {
  createActor as createProfilesActor,
  canisterId as profilesCanisterId
} from '../../declarations/profiles';
import {
  createActor as createProjectsActor,
  canisterId as projectsCanisterId
} from '../../declarations/projects';
import {
  createActor as createMatchingActor,
  canisterId as matchingCanisterId
} from '../../declarations/matching';
import {
  createActor as createContractsActor,
  canisterId as contractsCanisterId
} from '../../declarations/contracts';

// Initialize all actors with current identity
export const initActors = () => {
  const identity = getIdentity();
  const agentOptions = { identity };
  
  return {
    profiles: createProfilesActor(profilesCanisterId, { agentOptions }),
    projects: createProjectsActor(projectsCanisterId, { agentOptions }),
    matching: createMatchingActor(matchingCanisterId, { agentOptions }),
    contracts: createContractsActor(contractsCanisterId, { agentOptions })
  };
};