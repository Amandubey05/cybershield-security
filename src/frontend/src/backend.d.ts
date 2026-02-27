import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Course {
    id: bigint;
    title: string;
    duration: bigint;
    mode: string;
    description: string;
    isActive: boolean;
    category: string;
    price: bigint;
}
export interface AwarenessTip {
    id: bigint;
    title: string;
    content: string;
    category: string;
}
export type Time = bigint;
export interface ContactInquiry {
    id: bigint;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Event {
    id: bigint;
    title: string;
    date: Time;
    description: string;
    isActive: boolean;
    capacity: bigint;
    location: string;
    eventType: string;
}
export interface backendInterface {
    addAdmin(newAdmin: Principal): Promise<void>;
    createAwarenessTip(title: string, content: string, category: string): Promise<bigint>;
    createCourse(title: string, description: string, mode: string, duration: bigint, price: bigint, category: string): Promise<bigint>;
    createEvent(title: string, description: string, date: Time, location: string, eventType: string, capacity: bigint): Promise<bigint>;
    deleteAwarenessTip(id: bigint): Promise<void>;
    deleteCourse(id: bigint): Promise<void>;
    deleteEvent(id: bigint): Promise<void>;
    getAllCourses(): Promise<Array<Course>>;
    getAllTips(): Promise<Array<AwarenessTip>>;
    getCourse(id: bigint): Promise<Course | null>;
    getEvent(id: bigint): Promise<Event | null>;
    getInquiries(_admin: Principal): Promise<Array<ContactInquiry>>;
    getTip(id: bigint): Promise<AwarenessTip | null>;
    getUpcomingEvents(): Promise<Array<Event>>;
    submitInquiry(name: string, email: string, phone: string, subject: string, message: string): Promise<bigint>;
    updateAwarenessTip(id: bigint, title: string, content: string, category: string): Promise<void>;
    updateCourse(id: bigint, title: string, description: string, mode: string, duration: bigint, price: bigint, category: string, isActive: boolean): Promise<void>;
    updateEvent(id: bigint, title: string, description: string, date: Time, location: string, eventType: string, capacity: bigint, isActive: boolean): Promise<void>;
}
