/**
 * Safelist of Tailwind classes used by @a2ui/react theme.
 * This file ensures Tailwind generates CSS for all theme classes.
 *
 * Note: This file is scanned by Tailwind but never executed.
 */

// Content Components
const AudioPlayer = 'w-full rounded-lg bg-slate-100 p-4';
const Divider = 'shrink-0 bg-neutral-200 h-px w-full my-2';
const Icon = 'inline-flex items-center justify-center shrink-0';
const Image = 'max-w-full h-auto rounded-md w-5 h-5 rounded-none w-24 h-24 rounded-full object-cover mx-auto rounded-lg w-48 w-96 w-full';
const Text = 'leading-normal text-2xl font-medium text-neutral-900 text-xl text-base text-neutral-800 text-sm font-normal text-neutral-700 text-xs text-neutral-500 text-neutral-600';
const Video = 'w-full rounded-lg bg-black';

// Layout Components
const Card = 'rounded-2xl p-4';
const Column = 'flex flex-col';
const List = 'flex flex-col overflow-auto';
const Modal = 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-white p-6 shadow-xl';
const Row = 'flex flex-row items-center';
const Tabs = 'w-full mt-4 rounded-lg border border-slate-200 bg-white p-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-600 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-100 text-slate-900 bg-slate-100';

// Interactive Components
const Button = 'flex items-center justify-center gap-1 whitespace-nowrap rounded-full text-sm font-medium transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 min-h-9 px-4 py-2 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 w-full';
const CheckBox = 'flex items-center gap-3 h-4 w-4 rounded border border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm font-medium text-slate-700 leading-none';
const DateTimeInput = 'grid gap-2 flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 text-sm font-medium text-slate-700';
const MultipleChoice = 'grid gap-2 flex h-10 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 text-sm font-medium text-slate-700';
const Slider = 'grid gap-2 w-full h-2 cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600 text-sm font-medium text-slate-700';
const TextField = 'grid gap-2 flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 text-sm font-medium text-slate-700';

// Markdown
const markdown = 'leading-7 mb-4 text-3xl font-bold tracking-tight mb-4 mt-6 text-2xl font-semibold tracking-tight mb-3 mt-5 text-xl font-semibold mb-2 mt-4 text-lg font-medium mb-2 mt-3 text-base font-medium mb-2 mt-3 list-disc pl-6 mb-4 space-y-1 list-decimal pl-6 mb-4 space-y-1 leading-relaxed text-blue-600 underline underline-offset-4 hover:text-blue-800 font-semibold italic';

// Elements
const elements = 'text-blue-600 underline underline-offset-4 hover:text-blue-800 w-full cursor-pointer text-4xl font-bold tracking-tight text-3xl font-semibold tracking-tight text-2xl font-semibold text-xl font-semibold text-lg font-medium w-full border rounded-lg outline-none leading-7 bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm outline-none resize-y min-h-[100px] w-full rounded-lg';

export const safelist = { AudioPlayer, Divider, Icon, Image, Text, Video, Card, Column, List, Modal, Row, Tabs, Button, CheckBox, DateTimeInput, MultipleChoice, Slider, TextField, markdown, elements };
