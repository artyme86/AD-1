import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { getString } from '../../data/registrationStrings.ts';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Briefcase,
  Star,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Upload
} from 'lucide-react';
import {
  DegreeEntry,
  CertificationEntry,
  AwardEntry,
  AccomplishmentEntry,
  WorkExperienceEntry
} from '../../data/schema.ts';

interface R7Props {
  errors: Record<string, string>;
  onClearError: (field: string) => void;
}

export const R7Credentials: React.FC<R7Props> = () => {
  const { registrationDraft, updateRegistrationDraft } = useApp();
  const isProfessional = registrationDraft.listingType === 'Sports Professional';

  // Active form tab
  const [activeTab, setActiveTab] = useState<'certifications' | 'degrees' | 'awards' | 'accomplishments' | 'experience'>('certifications');

  // Deletion Confirmation Modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'certifications' | 'degrees' | 'awards' | 'accomplishments' | 'experience';
    id: string;
    itemName: string;
  } | null>(null);

  // Form states for adding/editing items
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({ name: '', issuingBody: '', year: '2024', fileName: '' });

  const [editingDegreeId, setEditingDegreeId] = useState<string | null>(null);
  const [degreeForm, setDegreeForm] = useState({ school: '', degree: '', fieldOfStudy: '', startDate: '2018', gradYear: '2022', description: '' });

  const [editingAwardId, setEditingAwardId] = useState<string | null>(null);
  const [awardForm, setAwardForm] = useState({ name: '', institution: '', year: '2023' });

  const [editingAccId, setEditingAccId] = useState<string | null>(null);
  const [accForm, setAccForm] = useState({ year: '2024', description: '' });

  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState({ title: '', company: '', current: false, startDate: '2020', endDate: '2024', description: '' });

  // Handlers for Certifications
  const handleSaveCert = () => {
    if (!certForm.name.trim() || !certForm.issuingBody.trim()) return;
    if (editingCertId) {
      updateRegistrationDraft({
        certifications: registrationDraft.certifications.map((c) =>
          c.id === editingCertId
            ? {
                ...c,
                name: certForm.name.trim(),
                issuingBody: certForm.issuingBody.trim(),
                year: certForm.year,
                certificateFileName: certForm.fileName || c.certificateFileName
              }
            : c
        )
      });
      setEditingCertId(null);
    } else {
      const newEntry: CertificationEntry = {
        id: `cert-${Date.now()}`,
        name: certForm.name.trim(),
        issuingBody: certForm.issuingBody.trim(),
        year: certForm.year,
        certificateFileName: certForm.fileName || `${certForm.name.replace(/\s+/g, '_')}_Certificate.pdf`,
        status: 'Pending verification'
      };
      updateRegistrationDraft({
        certifications: [...registrationDraft.certifications, newEntry]
      });
    }
    setCertForm({ name: '', issuingBody: '', year: '2024', fileName: '' });
  };

  // Handlers for Degrees
  const handleSaveDegree = () => {
    if (!degreeForm.school.trim() || !degreeForm.degree.trim()) return;
    if (editingDegreeId) {
      updateRegistrationDraft({
        degrees: registrationDraft.degrees.map((d) =>
          d.id === editingDegreeId
            ? {
                ...d,
                school: degreeForm.school.trim(),
                degree: degreeForm.degree.trim(),
                fieldOfStudy: degreeForm.fieldOfStudy.trim(),
                startDate: degreeForm.startDate,
                graduationYear: degreeForm.gradYear,
                description: degreeForm.description.trim()
              }
            : d
        )
      });
      setEditingDegreeId(null);
    } else {
      const newEntry: DegreeEntry = {
        id: `deg-${Date.now()}`,
        school: degreeForm.school.trim(),
        degree: degreeForm.degree.trim(),
        fieldOfStudy: degreeForm.fieldOfStudy.trim(),
        startDate: degreeForm.startDate,
        graduationYear: degreeForm.gradYear,
        description: degreeForm.description.trim()
      };
      updateRegistrationDraft({
        degrees: [...registrationDraft.degrees, newEntry]
      });
    }
    setDegreeForm({ school: '', degree: '', fieldOfStudy: '', startDate: '2018', gradYear: '2022', description: '' });
  };

  // Handlers for Awards
  const handleSaveAward = () => {
    if (!awardForm.name.trim()) return;
    if (editingAwardId) {
      updateRegistrationDraft({
        awards: registrationDraft.awards.map((a) =>
          a.id === editingAwardId
            ? { ...a, name: awardForm.name.trim(), institution: awardForm.institution.trim(), year: awardForm.year }
            : a
        )
      });
      setEditingAwardId(null);
    } else {
      const newEntry: AwardEntry = {
        id: `awd-${Date.now()}`,
        name: awardForm.name.trim(),
        institution: awardForm.institution.trim(),
        year: awardForm.year
      };
      updateRegistrationDraft({
        awards: [...registrationDraft.awards, newEntry]
      });
    }
    setAwardForm({ name: '', institution: '', year: '2023' });
  };

  // Handlers for Accomplishments
  const handleSaveAcc = () => {
    if (!accForm.description.trim()) return;
    if (editingAccId) {
      updateRegistrationDraft({
        accomplishments: registrationDraft.accomplishments.map((a) =>
          a.id === editingAccId
            ? { ...a, year: accForm.year, description: accForm.description.trim() }
            : a
        )
      });
      setEditingAccId(null);
    } else {
      const newEntry: AccomplishmentEntry = {
        id: `acc-${Date.now()}`,
        year: accForm.year,
        description: accForm.description.trim()
      };
      updateRegistrationDraft({
        accomplishments: [...registrationDraft.accomplishments, newEntry]
      });
    }
    setAccForm({ year: '2024', description: '' });
  };

  // Handlers for Experience
  const handleSaveExp = () => {
    if (!expForm.title.trim() || !expForm.company.trim()) return;
    if (editingExpId) {
      updateRegistrationDraft({
        workExperience: registrationDraft.workExperience.map((w) =>
          w.id === editingExpId
            ? {
                ...w,
                title: expForm.title.trim(),
                companyOrClub: expForm.company.trim(),
                currentlyWorkingHere: expForm.current,
                startDate: expForm.startDate,
                endDate: expForm.current ? 'Present' : expForm.endDate,
                description: expForm.description.trim()
              }
            : w
        )
      });
      setEditingExpId(null);
    } else {
      const newEntry: WorkExperienceEntry = {
        id: `exp-${Date.now()}`,
        title: expForm.title.trim(),
        companyOrClub: expForm.company.trim(),
        currentlyWorkingHere: expForm.current,
        startDate: expForm.startDate,
        endDate: expForm.current ? 'Present' : expForm.endDate,
        description: expForm.description.trim()
      };
      updateRegistrationDraft({
        workExperience: [...registrationDraft.workExperience, newEntry]
      });
    }
    setExpForm({ title: '', company: '', current: false, startDate: '2020', endDate: '2024', description: '' });
  };

  // Confirm delete
  const executeDelete = () => {
    if (!deleteModal) return;
    const { type, id } = deleteModal;
    if (type === 'certifications') {
      updateRegistrationDraft({ certifications: registrationDraft.certifications.filter((c) => c.id !== id) });
    } else if (type === 'degrees') {
      updateRegistrationDraft({ degrees: registrationDraft.degrees.filter((d) => d.id !== id) });
    } else if (type === 'awards') {
      updateRegistrationDraft({ awards: registrationDraft.awards.filter((a) => a.id !== id) });
    } else if (type === 'accomplishments') {
      updateRegistrationDraft({ accomplishments: registrationDraft.accomplishments.filter((a) => a.id !== id) });
    } else if (type === 'experience') {
      updateRegistrationDraft({ workExperience: registrationDraft.workExperience.filter((w) => w.id !== id) });
    }
    setDeleteModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-xl sm:text-2xl text-[var(--heading-color)] font-bold">
          {getString('reg.r7.title')}
        </h2>
        <p className="text-sm text-[var(--muted-color)]">
          {getString('reg.r7.subtitle')}
        </p>
      </div>

      {/* Type selection chips */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border-color)] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('certifications')}
          className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer transition-colors flex items-center gap-1.5 ${
            activeTab === 'certifications'
              ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
              : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Certifications ({registrationDraft.certifications.length})</span>
        </button>

        {isProfessional && (
          <button
            type="button"
            onClick={() => setActiveTab('degrees')}
            className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'degrees'
                ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>Degrees ({registrationDraft.degrees.length})</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveTab('awards')}
          className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer transition-colors flex items-center gap-1.5 ${
            activeTab === 'awards'
              ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
              : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Award className="w-4 h-4 text-amber-500" />
          <span>Awards ({registrationDraft.awards.length})</span>
        </button>

        {isProfessional && (
          <>
            <button
              type="button"
              onClick={() => setActiveTab('accomplishments')}
              className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'accomplishments'
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Star className="w-4 h-4 text-blue-400" />
              <span>Milestones ({registrationDraft.accomplishments.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-2 text-xs font-mono border min-h-[44px] cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'experience'
                  ? 'border-[var(--accent-red)] bg-[var(--inset-bg)] text-[var(--heading-color)] font-bold'
                  : 'border-[var(--border-color)] text-[var(--muted-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-rose-500" />
              <span>Experience ({registrationDraft.workExperience.length})</span>
            </button>
          </>
        )}
      </div>

      {/* TAB 1: CERTIFICATIONS */}
      {activeTab === 'certifications' && (
        <div className="space-y-4">
          {/* Existing list */}
          {registrationDraft.certifications.length > 0 && (
            <div className="space-y-3">
              {registrationDraft.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--heading-color)] text-sm">
                        {cert.name}
                      </span>
                      <span className="px-2 py-0.5 border border-amber-500/40 text-amber-500 bg-amber-500/10 font-mono text-[10px]">
                        {getString('reg.r7.pendingStatus')}
                      </span>
                    </div>
                    <div className="text-[var(--muted-color)]">
                      {cert.issuingBody} · Year {cert.year}
                    </div>
                    {cert.certificateFileName && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-500">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{cert.certificateFileName}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCertId(cert.id);
                        setCertForm({
                          name: cert.name,
                          issuingBody: cert.issuingBody,
                          year: cert.year,
                          fileName: cert.certificateFileName || ''
                        });
                      }}
                      className="btn-action text-xs py-1.5 px-3 gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.editItem')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteModal({
                          isOpen: true,
                          type: 'certifications',
                          id: cert.id,
                          itemName: cert.name
                        })
                      }
                      className="btn-action text-xs py-1.5 px-3 gap-1 text-[var(--accent-red)] hover:border-[var(--accent-red)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.removeItem')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add / Edit Form */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-4">
            <h4 className="font-heading text-sm font-bold text-[var(--heading-color)]">
              {editingCertId ? 'Edit Certification' : getString('reg.r7.addCertification')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.certName')} *
                </label>
                <input
                  type="text"
                  value={certForm.name}
                  onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                  placeholder="e.g. AFC B Coaching License, UEFA Pro, SafeSport Level 2"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.issuingBody')} *
                </label>
                <input
                  type="text"
                  value={certForm.issuingBody}
                  onChange={(e) => setCertForm({ ...certForm, issuingBody: e.target.value })}
                  placeholder="e.g. Qatar Football Association, World Aquatics, SafeSport"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.certYear')}
                </label>
                <input
                  type="text"
                  value={certForm.year}
                  onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                  placeholder="2024"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.certUpload')}
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setCertForm({
                      ...certForm,
                      fileName: `${certForm.name ? certForm.name.replace(/\s+/g, '_') : 'Certificate'}_Document.pdf`
                    })
                  }
                  className="btn-action w-full min-h-[44px] text-xs gap-2 justify-center"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {certForm.fileName ? `Attached: ${certForm.fileName}` : getString('reg.r7.certUploadBtn')}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {editingCertId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCertId(null);
                    setCertForm({ name: '', issuingBody: '', year: '2024', fileName: '' });
                  }}
                  className="btn-action text-xs min-h-[44px] px-4"
                >
                  {getString('reg.r7.cancel')}
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveCert}
                disabled={!certForm.name.trim() || !certForm.issuingBody.trim()}
                className="btn-primary text-xs min-h-[44px] px-5 disabled:opacity-50"
              >
                {editingCertId ? 'SAVE CHANGES' : 'ADD CERTIFICATION'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEGREES */}
      {isProfessional && activeTab === 'degrees' && (
        <div className="space-y-4">
          {registrationDraft.degrees.length > 0 && (
            <div className="space-y-3">
              {registrationDraft.degrees.map((deg) => (
                <div
                  key={deg.id}
                  className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-[var(--heading-color)] text-sm">
                      {deg.degree} in {deg.fieldOfStudy}
                    </span>
                    <div className="text-[var(--muted-color)]">
                      {deg.school} · Class of {deg.graduationYear} ({deg.startDate}–{deg.graduationYear})
                    </div>
                    {deg.description && (
                      <p className="text-[11px] text-[var(--muted-color)] italic">{deg.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDegreeId(deg.id);
                        setDegreeForm({
                          school: deg.school,
                          degree: deg.degree,
                          fieldOfStudy: deg.fieldOfStudy,
                          startDate: deg.startDate,
                          gradYear: deg.graduationYear,
                          description: deg.description
                        });
                      }}
                      className="btn-action text-xs py-1.5 px-3 gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.editItem')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteModal({
                          isOpen: true,
                          type: 'degrees',
                          id: deg.id,
                          itemName: `${deg.degree} (${deg.school})`
                        })
                      }
                      className="btn-action text-xs py-1.5 px-3 gap-1 text-[var(--accent-red)] hover:border-[var(--accent-red)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.removeItem')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add / Edit Degree Form */}
          <div className="p-5 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-4">
            <h4 className="font-heading text-sm font-bold text-[var(--heading-color)]">
              {editingDegreeId ? 'Edit Degree' : getString('reg.r7.addDegree')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.school')} *
                </label>
                <input
                  type="text"
                  value={degreeForm.school}
                  onChange={(e) => setDegreeForm({ ...degreeForm, school: e.target.value })}
                  placeholder="e.g. Qatar University, Loughborough University"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.degree')} *
                </label>
                <input
                  type="text"
                  value={degreeForm.degree}
                  onChange={(e) => setDegreeForm({ ...degreeForm, degree: e.target.value })}
                  placeholder="e.g. BSc, MSc, Diploma"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.fieldOfStudy')}
                </label>
                <input
                  type="text"
                  value={degreeForm.fieldOfStudy}
                  onChange={(e) => setDegreeForm({ ...degreeForm, fieldOfStudy: e.target.value })}
                  placeholder="e.g. Sports Science, Kinesiology"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.startDate')}
                </label>
                <input
                  type="text"
                  value={degreeForm.startDate}
                  onChange={(e) => setDegreeForm({ ...degreeForm, startDate: e.target.value })}
                  placeholder="2018"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.gradYear')}
                </label>
                <input
                  type="text"
                  value={degreeForm.gradYear}
                  onChange={(e) => setDegreeForm({ ...degreeForm, gradYear: e.target.value })}
                  placeholder="2022"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                {getString('reg.r7.description')}
              </label>
              <textarea
                rows={2}
                value={degreeForm.description}
                onChange={(e) => setDegreeForm({ ...degreeForm, description: e.target.value })}
                placeholder="Honors thesis or academic focus..."
                className="input-field w-full text-xs p-2.5"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {editingDegreeId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingDegreeId(null);
                    setDegreeForm({ school: '', degree: '', fieldOfStudy: '', startDate: '2018', gradYear: '2022', description: '' });
                  }}
                  className="btn-action text-xs min-h-[44px] px-4"
                >
                  {getString('reg.r7.cancel')}
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveDegree}
                disabled={!degreeForm.school.trim() || !degreeForm.degree.trim()}
                className="btn-primary text-xs min-h-[44px] px-5 disabled:opacity-50"
              >
                {editingDegreeId ? 'SAVE CHANGES' : 'ADD DEGREE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AWARDS */}
      {activeTab === 'awards' && (
        <div className="space-y-4">
          {registrationDraft.awards.length > 0 && (
            <div className="space-y-3">
              {registrationDraft.awards.map((award) => (
                <div
                  key={award.id}
                  className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-[var(--heading-color)] text-sm">
                      {award.name}
                    </span>
                    <div className="text-[var(--muted-color)]">
                      {award.institution} · {award.year}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAwardId(award.id);
                        setAwardForm({ name: award.name, institution: award.institution, year: award.year });
                      }}
                      className="btn-action text-xs py-1.5 px-3 gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.editItem')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteModal({
                          isOpen: true,
                          type: 'awards',
                          id: award.id,
                          itemName: award.name
                        })
                      }
                      className="btn-action text-xs py-1.5 px-3 gap-1 text-[var(--accent-red)] hover:border-[var(--accent-red)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.removeItem')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-5 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-4">
            <h4 className="font-heading text-sm font-bold text-[var(--heading-color)]">
              {editingAwardId ? 'Edit Award' : getString('reg.r7.addAward')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.awardName')} *
                </label>
                <input
                  type="text"
                  value={awardForm.name}
                  onChange={(e) => setAwardForm({ ...awardForm, name: e.target.value })}
                  placeholder="e.g. Coach of the Year, Facility Innovation Trophy"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.year')}
                </label>
                <input
                  type="text"
                  value={awardForm.year}
                  onChange={(e) => setAwardForm({ ...awardForm, year: e.target.value })}
                  placeholder="2023"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                {getString('reg.r7.institution')}
              </label>
              <input
                type="text"
                value={awardForm.institution}
                onChange={(e) => setAwardForm({ ...awardForm, institution: e.target.value })}
                placeholder="Conferring organization or committee"
                className="input-field w-full min-h-[44px] text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {editingAwardId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAwardId(null);
                    setAwardForm({ name: '', institution: '', year: '2023' });
                  }}
                  className="btn-action text-xs min-h-[44px] px-4"
                >
                  {getString('reg.r7.cancel')}
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveAward}
                disabled={!awardForm.name.trim()}
                className="btn-primary text-xs min-h-[44px] px-5 disabled:opacity-50"
              >
                {editingAwardId ? 'SAVE CHANGES' : 'ADD AWARD'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ACCOMPLISHMENTS (Professional Only) */}
      {isProfessional && activeTab === 'accomplishments' && (
        <div className="space-y-4">
          {registrationDraft.accomplishments.length > 0 && (
            <div className="space-y-3">
              {registrationDraft.accomplishments.map((acc) => (
                <div
                  key={acc.id}
                  className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-emerald-500 font-bold">{acc.year}</span>
                    <p className="text-[var(--heading-color)] leading-relaxed">{acc.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAccId(acc.id);
                        setAccForm({ year: acc.year, description: acc.description });
                      }}
                      className="btn-action text-xs py-1.5 px-3 gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.editItem')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteModal({
                          isOpen: true,
                          type: 'accomplishments',
                          id: acc.id,
                          itemName: `Milestone (${acc.year})`
                        })
                      }
                      className="btn-action text-xs py-1.5 px-3 gap-1 text-[var(--accent-red)] hover:border-[var(--accent-red)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.removeItem')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-5 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-4">
            <h4 className="font-heading text-sm font-bold text-[var(--heading-color)]">
              {editingAccId ? 'Edit Milestone' : getString('reg.r7.addAccomplishment')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.year')}
                </label>
                <input
                  type="text"
                  value={accForm.year}
                  onChange={(e) => setAccForm({ ...accForm, year: e.target.value })}
                  placeholder="2024"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.description')} *
                </label>
                <input
                  type="text"
                  value={accForm.description}
                  onChange={(e) => setAccForm({ ...accForm, description: e.target.value })}
                  placeholder="e.g. Led U12 squad to national junior championship final"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {editingAccId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAccId(null);
                    setAccForm({ year: '2024', description: '' });
                  }}
                  className="btn-action text-xs min-h-[44px] px-4"
                >
                  {getString('reg.r7.cancel')}
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveAcc}
                disabled={!accForm.description.trim()}
                className="btn-primary text-xs min-h-[44px] px-5 disabled:opacity-50"
              >
                {editingAccId ? 'SAVE CHANGES' : 'ADD MILESTONE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: WORK EXPERIENCE (Professional Only) */}
      {isProfessional && activeTab === 'experience' && (
        <div className="space-y-4">
          {registrationDraft.workExperience.length > 0 && (
            <div className="space-y-3">
              {registrationDraft.workExperience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 border border-[var(--border-color)] bg-[var(--panel-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-[var(--heading-color)] text-sm">
                      {exp.title}
                    </span>
                    <div className="text-[var(--muted-color)]">
                      {exp.companyOrClub} · {exp.startDate} – {exp.currentlyWorkingHere ? 'Present' : exp.endDate}
                    </div>
                    {exp.description && (
                      <p className="text-[11px] text-[var(--muted-color)]">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExpId(exp.id);
                        setExpForm({
                          title: exp.title,
                          company: exp.companyOrClub,
                          current: exp.currentlyWorkingHere,
                          startDate: exp.startDate,
                          endDate: exp.endDate,
                          description: exp.description
                        });
                      }}
                      className="btn-action text-xs py-1.5 px-3 gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.editItem')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteModal({
                          isOpen: true,
                          type: 'experience',
                          id: exp.id,
                          itemName: `${exp.title} at ${exp.companyOrClub}`
                        })
                      }
                      className="btn-action text-xs py-1.5 px-3 gap-1 text-[var(--accent-red)] hover:border-[var(--accent-red)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{getString('reg.r7.removeItem')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-5 border border-[var(--border-color)] bg-[var(--inset-bg)] space-y-4">
            <h4 className="font-heading text-sm font-bold text-[var(--heading-color)]">
              {editingExpId ? 'Edit Experience' : getString('reg.r7.addWorkExperience')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.jobTitle')} *
                </label>
                <input
                  type="text"
                  value={expForm.title}
                  onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                  placeholder="e.g. Lead Academy Coach, Physical Therapist"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.company')} *
                </label>
                <input
                  type="text"
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  placeholder="e.g. Al-Duhail SC Youth, West District Sports Academy"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.startDate')}
                </label>
                <input
                  type="text"
                  value={expForm.startDate}
                  onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                  placeholder="2021"
                  className="input-field w-full min-h-[44px] text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                  {getString('reg.r7.endDate')}
                </label>
                <input
                  type="text"
                  value={expForm.endDate}
                  disabled={expForm.current}
                  onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                  placeholder="2024"
                  className="input-field w-full min-h-[44px] text-xs disabled:opacity-50"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--heading-color)]">
              <input
                type="checkbox"
                checked={expForm.current}
                onChange={(e) => setExpForm({ ...expForm, current: e.target.checked })}
                className="w-4 h-4 rounded-none accent-[var(--accent-red)]"
              />
              <span>{getString('reg.r7.currentlyWorking')}</span>
            </label>

            <div>
              <label className="block text-xs font-mono-label text-[var(--heading-color)] mb-1 font-bold">
                {getString('reg.r7.description')}
              </label>
              <textarea
                rows={2}
                value={expForm.description}
                onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                placeholder="Core responsibilities and team achievements..."
                className="input-field w-full text-xs p-2.5"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {editingExpId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingExpId(null);
                    setExpForm({ title: '', company: '', current: false, startDate: '2020', endDate: '2024', description: '' });
                  }}
                  className="btn-action text-xs min-h-[44px] px-4"
                >
                  {getString('reg.r7.cancel')}
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveExp}
                disabled={!expForm.title.trim() || !expForm.company.trim()}
                className="btn-primary text-xs min-h-[44px] px-5 disabled:opacity-50"
              >
                {editingExpId ? 'SAVE CHANGES' : 'ADD EXPERIENCE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="border border-[var(--border-color)] bg-[var(--panel-bg)] w-full max-w-md p-6 space-y-4 shadow-none">
            <div className="flex items-center gap-2.5 text-amber-500">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-heading text-base font-bold text-[var(--heading-color)]">
                {getString('reg.r7.removeConfirmTitle')}
              </h3>
            </div>
            <p className="text-xs text-[var(--muted-color)] leading-relaxed">
              {getString('reg.r7.removeConfirmPrompt')} <span className="font-bold text-[var(--heading-color)]">"{deleteModal.itemName}"</span>? This item will be removed from your submission dossier.
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t border-[var(--border-color)]">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className="btn-action text-xs min-h-[44px] px-4"
              >
                {getString('reg.r7.cancel')}
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="btn-primary text-xs min-h-[44px] px-4 bg-[var(--accent-red)] border-[var(--accent-red)]"
              >
                {getString('reg.r7.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
