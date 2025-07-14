import Array "mo:base/Array";
import Float "mo:base/Float";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor MatchingEngine {

  // ———————— DATA TYPES ————————
  public type Profile = {
    id: Principal;
    name: Text;
    bio: Text;
    skills: [Text];
    profileType: { #talent; #company };
    reputation: Float;
  };

  public type Project = {
    id: Nat;
    owner: Principal;
    title: Text;
    description: Text;
    requiredSkills: [Text];
    budget: Nat;
    deadline: Int;
    status: { #open; #inProgress; #completed; #disputed };
  };

  // ———————— STORAGE ————————
  stable var profiles : [Profile] = [];
  stable var projects : [Project] = [];

  // ———————— INITIALIZATION ————————
  public shared func init() : async () {
    Debug.print("MatchingEngine initialized");
  };

  // ———————— MATCHING LOGIC ————————
  private func calculateProfileMatch(profile: Profile, reqSkills: [Text]) : Float {
    let talentSkills = profile.skills;
    var matches: Float = 0.0;
    for (skill in reqSkills.vals()) {
      if (Array.find<Text>(talentSkills, func(s: Text) : Bool { s == skill }) != null) {
        matches += 1.0;
      };
    };
    return matches / Float.fromInt(reqSkills.size());
  };

  private func calculateProjectMatch(talentSkills: [Text], reqSkills: [Text]) : Float {
    var matches: Float = 0.0;
    for (skill in reqSkills.vals()) {
      if (Array.find<Text>(talentSkills, func(s: Text) : Bool { s == skill }) != null) {
        matches += 1.0;
      };
    };
    return (matches / Float.fromInt(reqSkills.size())) * 0.5;
  };

  // ———————— REGISTRATION APIs ————————
  public shared func registerProfile(profile: Profile) : async Bool {
    profiles := Array.append<Profile>(profiles, [profile]);
    return true;
  };

  public shared func registerProject(project: Project) : async Bool {
    projects := Array.append<Project>(projects, [project]);
    return true;
  };

  // ———————— QUERY APIs ————————
  public shared query func findTopMatchesForProfile(
    profileId: Principal,
    count: Nat
  ) : async [(Nat, Float)] {
    let profileOpt = Array.find<Profile>(profiles, func(p: Profile) : Bool { p.id == profileId });
    switch (profileOpt) {
      case (?p) {
        let scored = Array.map<Project, (Nat, Float)>(projects, func(pr: Project) : (Nat, Float) {
          (pr.id, calculateProfileMatch(p, pr.requiredSkills))
        });
        let sorted = Array.sort<(Nat, Float)>(scored, func(a: (Nat, Float), b: (Nat, Float)) : Bool { b.1 < a.1 });
        return Array.take<(Nat, Float)>(sorted, count);
      };
      case null {
        return [];
      };
    };
  };

  public shared query func findTopMatchesForProject(
    projectId: Nat,
    count: Nat
  ) : async [(Principal, Float)] {
    let projectOpt = Array.find<Project>(projects, func(pr: Project) : Bool { pr.id == projectId });
    switch (projectOpt) {
      case (?prj) {
        let candidates = Array.filter<Profile>(profiles, func(p: Profile) : Bool { p.profileType == #talent });
        let scored = Array.map<Profile, (Principal, Float)>(candidates, func(tal: Profile) : (Principal, Float) {
          (tal.id, calculateProjectMatch(tal.skills, prj.requiredSkills))
        });
        let sorted = Array.sort<(Principal, Float)>(scored, func(a: (Principal, Float), b: (Principal, Float)) : Bool { b.1 < a.1 });
        return Array.take<(Principal, Float)>(sorted, count);
      };
      case null {
        return [];
      };
    };
  };
}