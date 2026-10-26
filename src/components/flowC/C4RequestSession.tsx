import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, ShieldCheck, Clock, MapPin, Calendar, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';
import { StatusChip } from '../shared/StatusChip.tsx';

export const C4RequestSession: React.FC = () => {
  const {
    coaches,
    selectedCoachForView,
    sessionSlots,
    sendSessionRequest,
    setFlowStep,
    parentSearch
  } = useApp();

  const coach =
    coaches.find((c) => c.id === selectedCoachForView) || coaches[0];

  const availableSlots = sessionSlots.filter((s) => s.isAvailable);

  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    availableSlots[0]?.id || sessionSlots[0].id
  );
  const [childFirstName, setChildFirstName] = useState('Sami');
  const [childAge, setChildAge] = useState(parentSearch.childAge || 9);
  const [childLevel, setChildLevel] = useState(parentSearch.childLevel || 'Intermediate');
  const [goal, setGoal] = useState('Improve 1v1 dribbling control, spatial awareness, and build field confidence.');
  const [message, setMessage] = useState('Looking forward to working together on technique fundamentals and ball speed.');
  const [parentName, setParentName] = useState('Khalid Al-Nuaimi');
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardianConsent) return;

    const chosenSlot = sessionSlots.find((s) => s.id === selectedSlotId) || sessionSlots[0];

    setIsSending(true);
    setTimeout(() => {
      sendSessionRequest({
        coachId: coach.id,
        slotId: chosenSlot.id,
        slotDay: chosenSlot.day,
        slotTime: chosenSlot.time,
        slotLocation: chosenSlot.location,
        childFirstName,
        childAge,
        childLevel,
        goal,
        message,
        parentName
      });
      setIsSending(false);
      setFlowStep('C5');
    }, 550);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-label text-[var(--muted-color)] mb-1">
            <span>ATHLETE & PARENT PORTAL</span>
            <span>/</span>
            <span>FIND A COACH</span>
            <span>/</span>
            <span className="text-[var(--accent-text)]">C4 REQUEST SESSION</span>
          </div>
          <h1 className="text-2xl font-heading text-[var(--heading-color)]">
            Schedule Private Session with {coach.name}
          </h1>
          <p className="text-sm text-[var(--muted-color)] mt-0.5">
            Select a verified calendar time slot and specify your child's developmental goals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip status="Client View" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Left (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSend} className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="font-heading text-base text-[var(--heading-color)]">
                Session Booking Form
              </h3>
              <p className="text-xs text-[var(--muted-color)]">
                All requests are subject to coach availability and safeguarding acceptance.
              </p>
            </div>

            {/* Slot Picker */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                01. SELECT AVAILABLE TIME SLOT *
              </label>
              <div className="space-y-2">
                {sessionSlots.map((slot) => {
                  const isSelected = selectedSlotId === slot.id;
                  return (
                    <label
                      key={slot.id}
                      className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-[var(--accent-red)] bg-[var(--inset-bg)]'
                          : slot.isAvailable
                          ? 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
                          : 'opacity-50 border-dashed cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="slotSelection"
                          disabled={!slot.isAvailable}
                          checked={isSelected}
                          onChange={() => setSelectedSlotId(slot.id)}
                          className="accent-[var(--accent-red)]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[var(--heading-color)]">
                            {slot.day} · {slot.time}
                          </div>
                          <div className="text-[11px] text-[var(--muted-color)]">
                            {slot.location} ({slot.surface})
                          </div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono-label ${slot.isAvailable ? 'text-emerald-500' : 'text-[var(--muted-color)]'}`}>
                        {slot.isAvailable ? 'AVAILABLE' : 'BOOKED'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Child Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  CHILD'S FIRST NAME *
                </label>
                <input
                  type="text"
                  required
                  value={childFirstName}
                  onChange={(e) => setChildFirstName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  CHILD'S AGE (YEARS) *
                </label>
                <input
                  type="number"
                  required
                  min={6}
                  max={17}
                  value={childAge}
                  onChange={(e) => setChildAge(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>
            </div>

            {/* Level & Parent Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  CURRENT PLAYING LEVEL *
                </label>
                <select
                  value={childLevel}
                  onChange={(e) => setChildLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                >
                  <option value="Beginner">Beginner (Foundations & Motor Skills)</option>
                  <option value="Intermediate">Intermediate (Academy / Club Player)</option>
                  <option value="Advanced">Advanced (Elite Travel Squad)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                  PARENT / GUARDIAN NAME *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                />
              </div>
            </div>

            {/* Coaching Goal */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                PRIMARY COACHING GOAL *
              </label>
              <input
                type="text"
                required
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
                placeholder="e.g. Ball control, agility, weak-foot passing"
              />
            </div>

            {/* Message to Coach */}
            <div>
              <label className="block text-xs font-mono-label text-[var(--muted-color)] mb-1">
                MESSAGE OR SPECIAL CONSIDERATIONS
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[var(--inset-bg)] border border-[var(--border-color)] text-[var(--heading-color)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)] leading-relaxed"
              />
            </div>

            {/* Mandatory Consent Checkbox */}
            <div className="pt-3 border-t border-[var(--border-color)]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={guardianConsent}
                  onChange={(e) => setGuardianConsent(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[var(--accent-red)]"
                />
                <span className="text-xs text-[var(--text-primary)] leading-snug">
                  <strong>Parent/Guardian Safeguarding Consent:</strong> I confirm that I am the legal parent or guardian of the child. I understand that direct contact details are released upon coach confirmation.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setFlowStep('C3')}
                className="btn-action text-xs gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO PROFILE</span>
              </button>

              <button
                type="submit"
                disabled={isSending || !guardianConsent}
                className="btn-primary text-xs py-3 px-6 gap-2"
              >
                {isSending ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                    <span>SENDING REQUEST...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND SESSION REQUEST</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Summary Card Right (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 border border-[var(--border-color)] bg-[var(--panel-bg)] space-y-4 sticky top-24">
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-mono-label text-[var(--muted-color)]">
                BOOKING SUMMARY
              </span>
              <h3 className="font-heading text-base text-[var(--heading-color)] mt-1">
                {coach.name}
              </h3>
              <p className="text-xs text-[var(--muted-color)]">{coach.headline}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Selected Slot:</span>
                <span className="font-bold text-[var(--heading-color)]">
                  {sessionSlots.find((s) => s.id === selectedSlotId)?.day} · {sessionSlots.find((s) => s.id === selectedSlotId)?.time}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Session Fee:</span>
                <span className="font-mono text-emerald-500 font-bold">
                  QAR {coach.pricePerSessionQar} (Sample)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Child:</span>
                <span className="font-bold text-[var(--heading-color)]">
                  {childFirstName || 'Child'} ({childAge} yrs, {childLevel})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--border-color)]">
                <span className="text-[var(--muted-color)]">Location:</span>
                <span className="text-[var(--heading-color)] text-right">
                  {sessionSlots.find((s) => s.id === selectedSlotId)?.location}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[var(--inset-bg)] border border-[var(--border-color)] space-y-1 text-xs text-[var(--muted-color)]">
              <span className="font-mono-label block text-[10px] text-emerald-500">
                MUTUAL CONFIRMATION PROTOCOL
              </span>
              <p className="text-[11px] leading-relaxed">
                When the coach accepts, your session is locked into both personal schedules and a notification is dispatched.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
