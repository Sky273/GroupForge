"use client";

/* eslint-disable react-hooks/refs */

import { useEffect, useMemo, useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RotateCcw, UserRound, UsersRound, X } from "lucide-react";

import { editorSlots, people } from "@/data/mock";
import { cn } from "@/lib/utils";

type AssignmentMap = Record<string, string | undefined>;

type Person = (typeof people)[number];
type Slot = (typeof editorSlots)[number];

const STORAGE_KEY = "groupforge-editor-preview-assignments";
const seededAssignments: AssignmentMap = {
  "slot-1": "person-4",
  "slot-5": "person-2",
};

function PersonCard({ person, dragging = false, interactive = true }: { person: Person; dragging?: boolean; interactive?: boolean }) {
  const draggable = useDraggable({
    id: person.id,
    data: { type: "person", personId: person.id },
    disabled: !interactive,
  });

  const style = draggable.transform ? { transform: CSS.Translate.toString(draggable.transform) } : undefined;

  return (
    <button
      ref={draggable.setNodeRef}
      style={style}
      className={cn(
        "w-full rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3 text-left transition",
        (draggable.isDragging || dragging) && "opacity-60 shadow-lg",
      )}
      {...(interactive ? draggable.listeners : {})}
      {...(interactive ? draggable.attributes : {})}
      type="button"
    >
      <div className="font-medium text-[var(--foreground)]">{person.name}</div>
      <div className="mt-1 text-sm text-[var(--muted)]">{person.role}</div>
      <div className="mt-2 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
        {person.tag}
      </div>
    </button>
  );
}

function SlotCard({
  slot,
  assignedPerson,
  activePersonId,
  onClear,
}: {
  slot: Slot;
  assignedPerson?: Person;
  activePersonId: string | null;
  onClear: (slotId: string) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: slot.id,
    data: { type: "slot", slotId: slot.id, slotType: slot.type },
  });

  const isValidTarget = activePersonId !== null;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "absolute min-w-44 rounded-[1.25rem] border bg-[var(--panel)]/95 p-3 shadow-lg backdrop-blur transition",
        isOver && isValidTarget ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-[var(--border-strong)]",
      )}
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform: "translate(-50%, -50%)" }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="font-medium text-[var(--foreground)]">{slot.title}</div>
          <div className="text-xs text-[var(--muted)]">{slot.subtitle}</div>
        </div>
        <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
          {slot.type}
        </div>
      </div>

      {assignedPerson ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-[var(--foreground)]">{assignedPerson.name}</div>
              <div className="mt-1 text-xs text-[var(--muted)]">{assignedPerson.role}</div>
            </div>
            <button
              type="button"
              onClick={() => onClear(slot.id)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--muted)] transition hover:text-[var(--foreground)]"
              aria-label="Retirer l'affectation"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className={cn(
          "rounded-xl border border-dashed px-3 py-3 text-sm transition",
          isOver && isValidTarget
            ? "border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-300"
            : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]",
        )}>
          Glisser une personne ici
        </div>
      )}
    </div>
  );
}

export function EditorPreview() {
  const [assignments, setAssignments] = useState<AssignmentMap>(() => {
    if (typeof window === "undefined") return seededAssignments;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seededAssignments;

    try {
      const parsed = JSON.parse(raw) as AssignmentMap;
      return { ...seededAssignments, ...parsed };
    } catch {
      return seededAssignments;
    }
  });
  const [activePersonId, setActivePersonId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
  }, [assignments]);

  const assignedPeople = useMemo(
    () =>
      Object.entries(assignments).reduce<Record<string, Person>>((acc, [slotId, personId]) => {
        const person = people.find((entry) => entry.id === personId);
        if (person) acc[slotId] = person;
        return acc;
      }, {}),
    [assignments],
  );

  const activePerson = people.find((person) => person.id === activePersonId) ?? null;

  function handleDragStart(event: DragStartEvent) {
    const personId = event.active.data.current?.personId;
    setActivePersonId(typeof personId === "string" ? personId : null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const overId = typeof event.over?.id === "string" ? event.over.id : null;
    const personId = event.active.data.current?.personId;

    if (overId && typeof personId === "string") {
      setAssignments((current) => ({
        ...current,
        [overId]: personId,
      }));
    }

    setActivePersonId(null);
  }

  function resetAssignments() {
    setAssignments(seededAssignments);
  }

  function clearAssignment(slotId: string) {
    setAssignments((current) => {
      const next = { ...current };
      delete next[slotId];
      return next;
    });
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid gap-6 xl:grid-cols-[260px_1fr_280px]">
        <aside className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-[var(--foreground)]">Bibliothèque</div>
            <button
              type="button"
              onClick={resetAssignments}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
          <div className="space-y-3">
            {people.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </aside>

        <div className="rounded-[1.75rem] border border-[var(--border)] bg-[radial-gradient(circle_at_top,var(--accent-soft),transparent_35%),var(--panel)] p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-[var(--foreground)]">Canevas</div>
              <div className="text-sm text-[var(--muted)]">Prototype local avec affectation drag and drop persistée dans le navigateur</div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
              <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">Grille</div>
              <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">Snap</div>
              <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">Autosave local</div>
            </div>
          </div>

          <div className="relative h-[520px] overflow-hidden rounded-[1.5rem] border border-dashed border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02))]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
            {editorSlots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                activePersonId={activePersonId}
                assignedPerson={assignedPeople[slot.id]}
                onClear={clearAssignment}
              />
            ))}
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="mb-3 text-sm font-semibold text-[var(--foreground)]">Inspecteur</div>
          <div className="space-y-4 text-sm text-[var(--muted)]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4">
              <div className="mb-1 font-medium text-[var(--foreground)]">État</div>
              <div>{Object.keys(assignments).length} slots affectés</div>
              <div className="mt-2">Le preview valide la boucle critique : drag, drop, remplacement, retrait, persistance locale.</div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4">
              <div className="mb-2 font-medium text-[var(--foreground)]">Actions prévues</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><UserRound className="h-4 w-4" /> Affecter une personne</li>
                <li className="flex items-center gap-2"><UsersRound className="h-4 w-4" /> Affecter un groupe imbriqué</li>
                <li className="flex items-center gap-2"><RotateCcw className="h-4 w-4" /> Undo / redo</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <DragOverlay>
        {activePerson ? <div className="w-56"><PersonCard person={activePerson} dragging interactive={false} /></div> : null}
      </DragOverlay>
    </DndContext>
  );
}
