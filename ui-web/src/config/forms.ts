import type { Language } from '../i18n/translations'

export type LocalizedText = Record<Language, string>

interface FieldBase {
  id: string
  label: LocalizedText
  hint?: LocalizedText
  required?: boolean
}

export interface TextField extends FieldBase {
  type: 'text' | 'textarea' | 'email' | 'number'
  placeholder?: LocalizedText
}

export interface ChoiceOption {
  value: string
  label: LocalizedText
}

export interface ChoiceField extends FieldBase {
  type: 'select' | 'radio' | 'checkbox'
  options: ChoiceOption[]
}

export type FormField = TextField | ChoiceField

export interface FormDefinition {
  slug: string
  badge: LocalizedText
  title: LocalizedText
  highlight: LocalizedText
  description: LocalizedText
  perks?: LocalizedText[]
  fields?: FormField[]
  successMessage?: LocalizedText
}

export const forms: FormDefinition[] = [
  {
    slug: 'coaching',
    badge: { ro: 'Aplicație coaching 1:1', en: '1:1 coaching application' },
    title: { ro: 'Aplică pentru', en: 'Apply for' },
    highlight: { ro: 'coaching 1:1', en: '1:1 coaching' },
    description: {
      ro: 'Răspunde la câteva întrebări ca să înțeleg unde ești acum și ce vrei să obții. Apoi te sun pentru o consultație gratuită de 30 de minute.',
      en: 'Answer a few questions so I understand where you are now and what you want to achieve. Then I will call you for a free 30-minute consultation.',
    },
    perks: [
      { ro: 'Plan de antrenament personalizat', en: 'Personalized training plan' },
      { ro: 'Plan de nutriție flexibil', en: 'Flexible nutrition plan' },
      { ro: 'Check-in săptămânal și ajustări', en: 'Weekly check-in and adjustments' },
      { ro: 'Suport direct', en: 'Direct support' },
    ],
    fields: [
      {
        id: 'goal',
        type: 'radio',
        required: true,
        label: { ro: 'Care este obiectivul tău principal?', en: 'What is your main goal?' },
        options: [
          { value: 'fat-loss', label: { ro: 'Slăbit', en: 'Fat loss' } },
          { value: 'muscle-gain', label: { ro: 'Masă musculară', en: 'Muscle gain' } },
          { value: 'recomposition', label: { ro: 'Tonifiere', en: 'Body recomposition' } },
          { value: 'health', label: { ro: 'Sănătate și energie', en: 'Health and energy' } },
        ],
      },
      {
        id: 'experience',
        type: 'radio',
        required: true,
        label: { ro: 'Cât de multă experiență ai cu antrenamentul?', en: 'How much training experience do you have?' },
        options: [
          { value: 'beginner', label: { ro: 'Începător', en: 'Beginner' } },
          { value: 'intermediate', label: { ro: 'Intermediar', en: 'Intermediate' } },
          { value: 'advanced', label: { ro: 'Avansat', en: 'Advanced' } },
        ],
      },
      {
        id: 'trainingLocation',
        type: 'radio',
        required: true,
        label: { ro: 'Unde te vei antrena?', en: 'Where will you train?' },
        options: [
          { value: 'gym', label: { ro: 'La sală', en: 'At the gym' } },
          { value: 'home', label: { ro: 'Acasă', en: 'At home' } },
          { value: 'both', label: { ro: 'Ambele', en: 'Both' } },
        ],
      },
      {
        id: 'startDate',
        type: 'select',
        required: true,
        label: { ro: 'Când vrei să începi?', en: 'When do you want to start?' },
        options: [
          { value: 'now', label: { ro: 'Cât mai curând', en: 'As soon as possible' } },
          { value: '2-weeks', label: { ro: 'În următoarele 2 săptămâni', en: 'Within the next 2 weeks' } },
          { value: '1-month', label: { ro: 'În următoarea lună', en: 'Within the next month' } },
          { value: 'researching', label: { ro: 'Doar mă informez', en: 'Just researching' } },
        ],
      },
      {
        id: 'notes',
        type: 'textarea',
        label: { ro: 'Ceva ce ar trebui să știu?', en: 'Anything I should know?' },
        placeholder: { ro: 'Accidentări, program, preferințe alimentare...', en: 'Injuries, schedule, food preferences...' },
      },
    ],
  },
]

export const findForm = (slug: string | undefined) => forms.find((form) => form.slug === slug)
