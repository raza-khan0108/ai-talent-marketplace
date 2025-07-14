import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor Profiles {
    public type Skill = Text;
    public type ProfileType = { #talent; #company };
    
    public type Profile = {
        id: Principal;
        name: Text;
        bio: Text;
        skills: [Skill];
        profileType: ProfileType;
        reputation: Float;
    };

    private var profiles = HashMap.HashMap<Principal, Profile>(0, Principal.equal, Principal.hash);

    // Create or update profile
    public shared(msg) func updateProfile(
        name: Text, 
        bio: Text, 
        skills: [Text], 
        profileType: ProfileType
    ) : async Profile {
        let profile: Profile = {
            id = msg.caller;
            name = name;
            bio = bio;
            skills = skills;
            profileType = profileType;
            reputation = 5.0; // Default reputation
        };
        profiles.put(msg.caller, profile);
        return profile;
    };

    // Get profile
    public query func getProfile(id: Principal) : async ?Profile {
        return profiles.get(id);
    };

    // Search profiles
    public query func searchProfiles(skill: Skill) : async [Profile] {
        let allProfiles = Iter.toArray(profiles.vals());
        Array.filter(allProfiles, func (p: Profile) : Bool {
            Array.find(p.skills, func (s: Text) : Bool { s == skill }) != null
        });
    };
};