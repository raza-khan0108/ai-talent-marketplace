import React, { useState, useEffect } from 'react';
import { getPrincipal } from '../utils/auth';
import { initActors } from '../utils/actors';
import ProjectList from './ProjectList';
import ProfileForm from './ProfileForm';
import ContractView from './ContractView';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('talent'); // talent or company
  const [principal, setPrincipal] = useState(null);
  
  const actors = initActors();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const principal = getPrincipal();
        setPrincipal(principal.toString());
        
        // Load user profile
        const userProfile = await actors.profiles.getProfile(principal);
        setProfile(userProfile);
        
        if (userProfile) {
          setUserType(userProfile.profileType);
          
          // Load AI matches for talent
          if (userProfile.profileType === 'talent') {
            const openProjects = await actors.projects.getOpenProjects();
            const matchResults = await Promise.all(
              openProjects.map(async p => ({
                project: p,
                score: await actors.matching.matchTalentToProject(principal, p.id)
              }))
            );
            setMatches(matchResults.sort((a, b) => b.score - a.score));
          }
          
          // Load user contracts
          const userContracts = await actors.contracts.getUserContracts(principal);
          setContracts(userContracts);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  const handleProfileUpdate = async (updatedProfile) => {
    await actors.profiles.updateProfile(
      updatedProfile.name,
      updatedProfile.bio,
      updatedProfile.skills,
      updatedProfile.profileType
    );
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {profile ? `Welcome, ${profile.name}!` : 'Complete Your Profile'}
            </h2>
            <p className="text-gray-600 mt-1">
              {profile?.bio || 'Add a bio to help others understand your expertise'}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {profile?.skills?.map((skill, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">Your Principal ID:</p>
            <p className="font-mono text-gray-700 text-xs truncate max-w-xs">{principal}</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'projects' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('projects')}
        >
          {userType === 'talent' ? 'Find Projects' : 'My Projects'}
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'contracts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('contracts')}
        >
          Contracts
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>

      <div>
        {activeTab === 'projects' && (
          <ProjectList 
            userType={userType} 
            projects={userType === 'talent' ? matches : []} 
            actors={actors}
          />
        )}
        
        {activeTab === 'contracts' && (
          <ContractView contracts={contracts} actors={actors} />
        )}
        
        {activeTab === 'profile' && (
          <ProfileForm profile={profile} onSave={handleProfileUpdate} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;