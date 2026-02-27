import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { Course, Event, AwarenessTip } from "../backend.d.ts";

export type { Course, Event, AwarenessTip };

// ─── Courses ────────────────────────────────────────────────────────────────

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      mode,
      duration,
      price,
      category,
    }: {
      title: string;
      description: string;
      mode: string;
      duration: bigint;
      price: bigint;
      category: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createCourse(title, description, mode, duration, price, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

// ─── Events ─────────────────────────────────────────────────────────────────

export function useGetUpcomingEvents() {
  const { actor, isFetching } = useActor();
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUpcomingEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      date,
      location,
      eventType,
      capacity,
    }: {
      title: string;
      description: string;
      date: bigint;
      location: string;
      eventType: string;
      capacity: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createEvent(title, description, date, location, eventType, capacity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

// ─── Tips ───────────────────────────────────────────────────────────────────

export function useGetAllTips() {
  const { actor, isFetching } = useActor();
  return useQuery<AwarenessTip[]>({
    queryKey: ["tips"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTips();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTip() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content,
      category,
    }: {
      title: string;
      content: string;
      category: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createAwarenessTip(title, content, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tips"] });
    },
  });
}

// ─── Inquiries ───────────────────────────────────────────────────────────────

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      subject,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitInquiry(name, email, phone, subject, message);
    },
  });
}
