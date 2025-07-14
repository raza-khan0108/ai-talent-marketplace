import React, { useState } from 'react';
import ProjectDetail from './ProjectDetail';

const ProjectList = ({ userType, projects, actors }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    requiredSkills: [],
    budget: '',
    deadline: ''
  });
  const [currentSkill, setCurrentSkill] = useState('');

  const handleCreateProject = async () => {
    await actors.projects.createProject(
      newProject.title,
      newProject.description,
      newProject.requiredSkills,
      parseInt(newProject.budget) * 100000000,
      Math.floor(new Date(newProject.deadline).getTime() / 1000)
    );
    setIsCreatingProject(false);
    setNewProject({
      title: '',
      description: '',
      requiredSkills: [],
      budget: '',
      deadline: ''
    });
  };

  const addSkill = () => {
    if (currentSkill.trim() && !newProject.requiredSkills.includes(currentSkill.trim())) {
      setNewProject({
        ...newProject,
        requiredSkills: [...newProject.requiredSkills, currentSkill.trim()]
      });
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill) => {
    setNewProject({
      ...newProject,
      requiredSkills: newProject.requiredSkills.filter(s => s !== skill)
    });
  };

  if (selectedProject) {
    return (
      <ProjectDetail 
        project={selectedProject} 
        onBack={() => setSelectedProject(null)}
        actors={actors}
      />
    );
  }

  if (isCreatingProject) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Project</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Project Title</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Required Skills</label>
            <div className="flex">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add a skill"
              />
              <button
                onClick={addSkill}
                className="bg-indigo-500 text-white px-4 py-2 rounded-r hover:bg-indigo-600 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.requiredSkills.map((skill, index) => (
                <div key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Budget (ICP)</label>
              <input
                type="number"
                value={newProject.budget}
                onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Deadline</label>
              <input
                type="date"
                value={newProject.deadline}
                onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setIsCreatingProject(false)}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {userType === 'company' && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setIsCreatingProject(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Project
          </button>
        </div>
      )}
      
      {userType === 'talent' && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">AI-Powered Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((match, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800">{match.project.title}</h3>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {match.score.toFixed(1)}% match
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 line-clamp-2">{match.project.description}</p>
                  <div className="mt-3">
                    <span className="text-sm font-medium text-gray-700">Budget:</span>
                    <span className="ml-2 font-bold">{(match.project.budget / 100000000).toFixed(2)} ICP</span>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedProject(match.project)}
                      className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {userType === 'talent' ? 'All Open Projects' : 'My Projects'}
          </h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="p-5 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-800">{project.title}</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {(project.budget / 100000000).toFixed(2)} ICP
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.requiredSkills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No projects found</h3>
              <p className="mt-1 text-gray-500">
                {userType === 'talent' 
                  ? 'There are currently no open projects matching your skills.' 
                  : "You haven't created any projects yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;