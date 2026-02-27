import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

actor {
  type Course = {
    id : Nat;
    title : Text;
    description : Text;
    mode : Text; // "online", "offline", "both"
    duration : Nat; // in hours
    price : Nat; // in USD
    category : Text; // cybersecurity topic
    isActive : Bool;
  };

  module Course {
    public func compare(course1 : Course, course2 : Course) : Order.Order {
      Nat.compare(course1.id, course2.id);
    };
  };

  type Event = {
    id : Nat;
    title : Text;
    description : Text;
    date : Time.Time;
    location : Text;
    eventType : Text; // "seminar" or "workshop"
    capacity : Nat;
    isActive : Bool;
  };

  module Event {
    public func compare(event1 : Event, event2 : Event) : Order.Order {
      if (event1.date > event2.date) { #greater } else { #less };
    };
  };

  type ContactInquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactInquiry {
    public func compare(inquiry1 : ContactInquiry, inquiry2 : ContactInquiry) : Order.Order {
      Int.compare(inquiry1.timestamp, inquiry2.timestamp);
    };
  };

  type AwarenessTip = {
    id : Nat;
    title : Text;
    content : Text;
    category : Text;
  };

  module AwarenessTip {
    public func compare(tip1 : AwarenessTip, tip2 : AwarenessTip) : Order.Order {
      Nat.compare(tip1.id, tip2.id);
    };
  };

  let courses = Map.empty<Nat, Course>();
  let events = Map.empty<Nat, Event>();
  let contactInquiries = Map.empty<Nat, ContactInquiry>();
  let awarenessTips = Map.empty<Nat, AwarenessTip>();

  var nextCourseId = 1;
  var nextEventId = 1;
  var nextInquiryId = 1;
  var nextTipId = 1;

  let admins = List.empty<Principal>();
  let owner = Principal.fromText("2vxsx-fae");

  public shared ({ caller }) func addAdmin(newAdmin : Principal) : async () {
    if (caller != owner) {
      Runtime.trap("Only the owner can add admins");
    };
    admins.add(newAdmin);
  };

  func isAdmin(caller : Principal) : Bool {
    if (caller == owner) {
      return true;
    };
    admins.toArray().find(func(admin) { admin == caller }) != null;
  };

  func assertAdmin(caller : Principal) {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
  };

  // Courses
  public shared ({ caller }) func createCourse(title : Text, description : Text, mode : Text, duration : Nat, price : Nat, category : Text) : async Nat {
    assertAdmin(caller);
    let course : Course = {
      id = nextCourseId;
      title;
      description;
      mode;
      duration;
      price;
      category;
      isActive = true;
    };
    courses.add(nextCourseId, course);
    nextCourseId += 1;
    course.id;
  };

  public query ({ caller }) func getCourse(id : Nat) : async ?Course {
    courses.get(id);
  };

  public query ({ caller }) func getAllCourses() : async [Course] {
    courses.values().toArray();
  };

  public shared ({ caller }) func updateCourse(id : Nat, title : Text, description : Text, mode : Text, duration : Nat, price : Nat, category : Text, isActive : Bool) : async () {
    assertAdmin(caller);
    switch (courses.get(id)) {
      case (null) { Runtime.trap("Course not found") };
      case (?_) {
        let updatedCourse : Course = {
          id;
          title;
          description;
          mode;
          duration;
          price;
          category;
          isActive;
        };
        courses.add(id, updatedCourse);
      };
    };
  };

  public shared ({ caller }) func deleteCourse(id : Nat) : async () {
    assertAdmin(caller);
    if (not courses.containsKey(id)) {
      Runtime.trap("Course not found");
    };
    courses.remove(id);
  };

  // Events
  public shared ({ caller }) func createEvent(title : Text, description : Text, date : Time.Time, location : Text, eventType : Text, capacity : Nat) : async Nat {
    assertAdmin(caller);
    let event : Event = {
      id = nextEventId;
      title;
      description;
      date;
      location;
      eventType;
      capacity;
      isActive = true;
    };
    events.add(nextEventId, event);
    nextEventId += 1;
    event.id;
  };

  public query ({ caller }) func getEvent(id : Nat) : async ?Event {
    events.get(id);
  };

  public query ({ caller }) func getUpcomingEvents() : async [Event] {
    events.values().toArray().sort();
  };

  public shared ({ caller }) func updateEvent(id : Nat, title : Text, description : Text, date : Time.Time, location : Text, eventType : Text, capacity : Nat, isActive : Bool) : async () {
    assertAdmin(caller);
    switch (events.get(id)) {
      case (null) { Runtime.trap("Event not found") };
      case (?_) {
        let updatedEvent : Event = {
          id;
          title;
          description;
          date;
          location;
          eventType;
          capacity;
          isActive;
        };
        events.add(id, updatedEvent);
      };
    };
  };

  public shared ({ caller }) func deleteEvent(id : Nat) : async () {
    assertAdmin(caller);
    if (not events.containsKey(id)) {
      Runtime.trap("Event not found");
    };
    events.remove(id);
  };

  // Contact Inquiries
  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, subject : Text, message : Text) : async Nat {
    let inquiry : ContactInquiry = {
      id = nextInquiryId;
      name;
      email;
      phone;
      subject;
      message;
      timestamp = Time.now();
    };
    contactInquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    inquiry.id;
  };

  public shared ({ caller }) func getInquiries(_admin : Principal) : async [ContactInquiry] {
    assertAdmin(_admin);
    contactInquiries.values().toArray().sort();
  };

  // Awareness Tips
  public shared ({ caller }) func createAwarenessTip(title : Text, content : Text, category : Text) : async Nat {
    assertAdmin(caller);
    let tip : AwarenessTip = {
      id = nextTipId;
      title;
      content;
      category;
    };
    awarenessTips.add(nextTipId, tip);
    nextTipId += 1;
    tip.id;
  };

  public query ({ caller }) func getTip(id : Nat) : async ?AwarenessTip {
    awarenessTips.get(id);
  };

  public query ({ caller }) func getAllTips() : async [AwarenessTip] {
    awarenessTips.values().toArray();
  };

  public shared ({ caller }) func updateAwarenessTip(id : Nat, title : Text, content : Text, category : Text) : async () {
    assertAdmin(caller);
    switch (awarenessTips.get(id)) {
      case (null) { Runtime.trap("Tip not found") };
      case (?_) {
        let updatedTip : AwarenessTip = {
          id;
          title;
          content;
          category;
        };
        awarenessTips.add(id, updatedTip);
      };
    };
  };

  public shared ({ caller }) func deleteAwarenessTip(id : Nat) : async () {
    assertAdmin(caller);
    if (not awarenessTips.containsKey(id)) {
      Runtime.trap("Tip not found");
    };
    awarenessTips.remove(id);
  };
};
