import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";

actor Projects {
    public type ProjectStatus = { #open; #inProgress; #completed; #disputed };
    public type Project = {
        id: Nat;
        owner: Principal;
        title: Text;
        description: Text;
        requiredSkills: [Text];
        budget: Nat; // ICP e8s
        deadline: Int; // Changed from Time.Time to Int
        status: ProjectStatus;
    };

    private var projects = HashMap.HashMap<Nat, Project>(0, Nat.equal, Hash.hash);
    private var nextId: Nat = 1;

    // Create new project
    public shared(msg) func createProject(
        title: Text,
        description: Text,
        requiredSkills: [Text],
        budget: Nat,
        deadline: Int // Changed from Time.Time to Int
    ) : async Project {
        let project: Project = {
            id = nextId;
            owner = msg.caller;
            title = title;
            description = description;
            requiredSkills = requiredSkills;
            budget = budget;
            deadline = deadline;
            status = #open;
        };
        projects.put(nextId, project);
        nextId += 1;
        return project;
    };

    // Rest of the file remains the same...
    // Get project by ID, getOpenProjects, updateStatus...
};