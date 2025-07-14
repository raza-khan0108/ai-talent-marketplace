import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Nat "mo:base/Nat";

actor Contracts {
    public type ContractStatus = { #proposed; #accepted; #inProgress; #completed; #disputed };
    public type Milestone = {
        title: Text;
        amount: Nat; // ICP e8s
        dueDate: Time.Time;
        completed: Bool;
    };
    
    public type Contract = {
        id: Nat;
        projectId: Nat;
        talent: Principal;
        client: Principal;
        terms: Text;
        totalAmount: Nat;
        milestones: [Milestone];
        status: ContractStatus;
        createdAt: Time.Time;
    };

    private var contracts = HashMap.HashMap<Nat, Contract>(0, Nat.equal, Hash.hash);
    private var nextId: Nat = 1;

    // Create new contract
    public shared(msg) func createContract(
        projectId: Nat,
        talent: Principal,
        terms: Text,
        totalAmount: Nat,
        milestones: [Milestone]
    ) : async Contract {
        let contract: Contract = {
            id = nextId;
            projectId = projectId;
            talent = talent;
            client = msg.caller;
            terms = terms;
            totalAmount = totalAmount;
            milestones = milestones;
            status = #proposed;
            createdAt = Time.now();
        };
        contracts.put(nextId, contract);
        nextId += 1;
        return contract;
    };

    // Accept contract
    public shared(msg) func acceptContract(id: Nat) : async Result.Result<(), Text> {
        switch (contracts.get(id)) {
            case (?contract) {
                if (contract.talent != msg.caller) {
                    return #err("Unauthorized");
                };
                let updated = {
                    id = contract.id;
                    projectId = contract.projectId;
                    talent = contract.talent;
                    client = contract.client;
                    terms = contract.terms;
                    totalAmount = contract.totalAmount;
                    milestones = contract.milestones;
                    status = #accepted;
                    createdAt = contract.createdAt;
                };
                contracts.put(id, updated);
                return #ok(());
            };
            case null { return #err("Contract not found"); };
        };
    };

    // Release payment for milestone
    public shared(msg) func releasePayment(contractId: Nat, milestoneIndex: Nat) : async Result.Result<(), Text> {
        // Would include actual token transfer logic
        return #ok(());
    };

    // Dispute resolution
    public shared(msg) func raiseDispute(contractId: Nat, reason: Text) : async Result.Result<(), Text> {
        // Would include DAO or arbitrator logic
        return #ok(());
    };
};