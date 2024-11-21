'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BoringNJ() {
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-3xl bg-gray-300 p-4 mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-700">NJ Tourist Guide</h1>
      </header>

      <main className="w-full max-w-3xl bg-white p-6 rounded shadow-sm">
        <AboutSection />
        <ThingsToDoSection />

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Apply to visit</h2>
          <ContactForm onSubmit={handleSubmit} />
        </section>

        {showAlert && (
          <Alert className="mt-4">
            <AlertTitle>Application denied</AlertTitle>
            <AlertDescription>
              Its for your own good.
            </AlertDescription>
          </Alert>
        )}
      </main>

      <footer className="w-full max-w-3xl bg-gray-300 p-4 mt-6 text-center text-gray-600">
        <p>&copy; 2013. All rights reserved, i guess.</p>
      </footer>
    </div>
  )
}

function AboutSection() {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-600 mb-2">About Our State</h2>
      <p className="text-gray-500 leading-relaxed">
        New Jersey is a state. It has some cities and some beaches. Sometimes people go to these places. The weather changes throughout the year.
      </p>
    </section>
  )
}

function ThingsToDoSection() {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-600 mb-2">Things to Do</h2>
      <ul className="list-disc list-inside text-gray-500">
        <li>Visit the shore</li>
        <li>Look at some buildings</li>
        <li>Eat food</li>
        <li>Drive on a road (or a turnpike)</li>
      </ul>
    </section>
  )
}

function ContactForm({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="message" className="text-gray-600">Reason for visit</Label>
        <textarea id="message" className="w-full h-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="why?..."></textarea>
      </div>
      <Button type="submit" className="w-full bg-gray-400 hover:bg-gray-500 text-white">Send application</Button>
    </form>
  )
}