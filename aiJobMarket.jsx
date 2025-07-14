import React, { useState, useEffect } from 'react';
import { initAuth, getPrincipal } from '../utils/auth';
import { Principal } from '@dfinity/principal';
import { createActor as createProfilesActor } from '../../../declarations/profiles';
import { createActor as createProjectsActor } from '../../../declarations/projects';
import { createActor as createMatchingActor } from '../../../declarations/matching';

const AIJobMarket = () => {
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initialize = async () => {
            await initAuth();
            await loadData();
        };
        initialize();
    }, []);

    const loadData = async () => {
        try {
            const principal = getPrincipal();
            
            // Initialize actors
            const profilesActor = createProfilesActor(process.env.PROFILES_CANISTER_ID);
            const projectsActor = createProjectsActor(process.env.PROJECTS_CANISTER_ID);
            const matchingActor = createMatchingActor(process.env.MATCHING_CANISTER_ID);
            
            // Load profile
            const userProfile = await profilesActor.getProfile(principal);
            setProfile(userProfile);
            
            // Load projects
            const openProjects = await projectsActor.getOpenProjects();
            setProjects(openProjects);
            
            // Get AI matches
            if (userProfile && userProfile.profileType === 'talent') {
                const matchResults = await Promise.all(
                    openProjects.map(async p => ({
                        project: p,
                        score: await matchingActor.matchTalentToProject(
                            principal, 
                            p.id
                        )
                    }))
                );
                setMatches(matchResults.sort((a, b) => b.score - a.score));
            }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading AI Talent Marketplace...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* ... rest of the component ... */}
        </div>
    );
};

export default AIJobMarket;