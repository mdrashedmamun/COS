/**
 * Growth Physics Calculator - Landing Page
 *
 * Main interface for the Growth Physics Calculator with:
 * - Service vertical selection (featured vs. waitlist)
 * - Example data pre-population based on vertical
 * - Growth Physics formula calculations
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import verticalConfig from '../data/verticals.json';
import { getExampleInputForVertical } from '../lib/schemas/input-schema';
import type { VerticalMetadata } from '../lib/schemas/verticals-schema';
import type { CalculatorInput } from '../lib/schemas/input-schema';

export default function Home() {
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [exampleData, setExampleData] = useState<CalculatorInput | null>(null);
  const [calculatorInput, setCalculatorInput] = useState<CalculatorInput>({
    metrics: {
      annualRevenue: 0,
      netMargin: 0,
      netProfit: 0,
    },
    timestamp: new Date(),
  });

  // Load vertical characteristics when vertical is selected
  const handleVerticalSelect = (verticalId: string) => {
    setSelectedVertical(verticalId);
    // Don't auto-load example data - let users input their own
    setExampleData(null);
    setCalculatorInput({
      metrics: {
        annualRevenue: 0,
        netMargin: 0,
        netProfit: 0,
      },
      timestamp: new Date(),
    });
  };

  // Separate featured and waitlist verticals
  const featuredVerticals = verticalConfig.featured;
  const waitlistVerticals = verticalConfig.waitlist;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-50 to-warm-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-serif text-warm-900">
                Growth Physics
              </h1>
              <p className="text-sm text-sage-600 mt-1 font-medium tracking-wide">
                BUSINESS CONSTRAINT DIAGNOSIS
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-sage-600 font-medium tracking-wide">POWERED BY</p>
              <p className="text-sm font-semibold text-warm-700 mt-1">Alex Hormozi Framework</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-warm-900 mb-4 leading-tight">
            Identify Your<br />
            <span className="bg-gradient-to-r from-sage-600 to-warm-600 bg-clip-text text-transparent">Growth Constraint</span>
          </h2>
          <p className="text-xl text-warm-700 mb-4 leading-relaxed">
            Every business has one constraint that limits growth. Find yours in minutes.
          </p>
          <p className="text-base text-sage-600 font-medium tracking-wide">
            Used by service businesses across 8 industries
          </p>
        </section>

        {/* Vertical Selection Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-serif text-warm-900 mb-3">
              Which describes your business?
            </h3>
            <p className="text-warm-700">
              Select your service vertical to get started
            </p>
          </div>

          {/* Featured Verticals */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVerticals.map((vertical) => (
                <button
                  key={vertical.id}
                  onClick={() => handleVerticalSelect(vertical.id)}
                  className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left overflow-hidden ${
                    selectedVertical === vertical.id
                      ? 'border-sage-600 bg-gradient-to-br from-sage-50 to-warm-50 shadow-lg'
                      : 'border-sage-200 bg-white hover:border-sage-400 hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-sage-100/30 rounded-full -mr-10 -mt-10 group-hover:bg-warm-100/30 transition-colors" />

                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{vertical.emoji || '📊'}</div>
                    <h4 className="font-semibold text-warm-900 text-lg mb-2">{vertical.name}</h4>
                    <p className="text-sm text-warm-700 leading-relaxed line-clamp-2">{vertical.description}</p>

                    {/* Margin Profile Badge */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs font-medium text-sage-600 bg-sage-100 px-2 py-1 rounded-full">
                        {vertical.marginProfile}
                      </span>
                      <span className="text-xs font-medium text-warm-600 bg-warm-100 px-2 py-1 rounded-full">
                        {vertical.scalingConstraint}
                      </span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedVertical === vertical.id && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="w-6 h-6 rounded-full bg-sage-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Waitlist Verticals */}
          <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-8 rounded-xl border border-sage-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold font-serif text-warm-900 mb-1">Coming Soon</h3>
                <p className="text-sm text-warm-700">
                  {waitlistVerticals.length} additional verticals in development
                </p>
              </div>
              <span className="text-2xl">⏳</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {waitlistVerticals.slice(0, 8).map((vertical) => (
                <div
                  key={vertical.id}
                  className="p-3 rounded-lg bg-white border border-sage-200 opacity-70 cursor-not-allowed hover:opacity-80 transition-opacity"
                >
                  <div className="text-2xl mb-1">{vertical.emoji || '📊'}</div>
                  <h4 className="font-semibold text-warm-800 text-xs line-clamp-2">{vertical.name}</h4>
                </div>
              ))}
            </div>

            <p className="text-sm text-warm-700">
              <strong>Interested?</strong> More verticals will launch in Q2 2026. The framework applies to any service business model.
            </p>
          </div>
        </section>

        {/* Vertical Selection Details Section - Shows when vertical selected */}
        {selectedVertical && (
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            {(() => {
              const vertical = featuredVerticals.find(v => v.id === selectedVertical);
              if (!vertical) return null;

              return (
                <>
                  <div className="mb-8">
                    <div className="flex items-start gap-6">
                      <div className="text-6xl">{vertical.emoji}</div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{vertical.name}</h2>
                        <p className="text-lg text-gray-600 mb-4">{vertical.description}</p>

                        {/* Vertical Characteristics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Business Model</h3>
                            <ul className="space-y-2 text-gray-700">
                              <li><span className="font-medium">Service Model:</span> {vertical.serviceModel.replace(/_/g, ' ')}</li>
                              <li><span className="font-medium">Growth Stage:</span> {vertical.growthStage.replace(/_/g, ' ')}</li>
                              <li><span className="font-medium">Margin Profile:</span> {vertical.marginProfile}</li>
                              <li><span className="font-medium">Primary Constraint:</span> {vertical.scalingConstraint}</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Key Characteristics</h3>
                            <ul className="space-y-2">
                              {vertical.characteristics.slice(0, 4).map((char, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-gray-700">
                                  <span className="text-indigo-600 font-bold">•</span>
                                  <span>{char}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t">
                    <Link
                      href="/calculator"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold inline-block transition-colors"
                    >
                      Start Constraint Analysis →
                    </Link>
                    <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-semibold transition-colors">
                      Learn More
                    </button>
                  </div>

                  {/* Info Message */}
                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      💡 <strong>Ready to begin?</strong> Click "Start Constraint Analysis" to enter your business metrics and get a personalized diagnosis of your primary growth constraint.
                    </p>
                  </div>
                </>
              );
            })()}
          </section>
        )}

        {/* Info Section */}
        {!selectedVertical && (
          <section className="mt-16 bg-gradient-to-r from-sage-600 to-warm-600 rounded-xl p-12 text-white">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-serif font-bold mb-6">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Select Your Vertical</h4>
                    <p className="text-sm text-white/90">Choose from 8 featured service business types</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Enter Your Metrics</h4>
                    <p className="text-sm text-white/90">Revenue, margin, CAC, and LTV from your business</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Get Your Diagnosis</h4>
                    <p className="text-sm text-white/90">Identify your primary growth constraint instantly</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Follow Your Playbook</h4>
                    <p className="text-sm text-white/90">90-day roadmap specific to your constraint</p>
                  </div>
                </div>
              </div>
              <Link href="/calculator" className="inline-block px-8 py-3 bg-white text-warm-900 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Get Started Now →
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-warm-900 text-warm-100 py-8 mt-20 border-t border-warm-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-sm">
              Growth Physics • {featuredVerticals.length} featured verticals • {waitlistVerticals.length} coming soon
            </p>
            <p className="text-xs text-warm-400">
              Built from the frameworks by Alex Hormozi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
