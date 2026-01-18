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
  });

  // Load example data when vertical is selected
  const handleVerticalSelect = (verticalId: string) => {
    setSelectedVertical(verticalId);

    // Load example data for this vertical
    const examples = getExampleInputForVertical(verticalId);
    if (examples) {
      setExampleData(examples);
      setCalculatorInput(examples);
    } else {
      setExampleData(null);
      // Reset form
      setCalculatorInput({
        metrics: {
          annualRevenue: 0,
          netMargin: 0,
          netProfit: 0,
        },
      });
    }
  };

  // Separate featured and waitlist verticals
  const featuredVerticals = verticalConfig.featured;
  const waitlistVerticals = verticalConfig.waitlist;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Growth Physics Calculator
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Data-driven business model analysis for service businesses
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Powered by</p>
              <p className="text-lg font-semibold text-indigo-600">Growth Physics Framework</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Vertical Selection Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Select Your Service Vertical
          </h2>
          <p className="text-gray-600 mb-6">
            Choose your business type to access playbooks, benchmarks, and example metrics from real case studies.
          </p>

          {/* Featured Verticals */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">✓</span>
              Featured Service Verticals (Ready to Use)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredVerticals.map((vertical) => (
                <button
                  key={vertical.id}
                  onClick={() => handleVerticalSelect(vertical.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedVertical === vertical.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{vertical.emoji || '📊'}</div>
                  <h4 className="font-semibold text-gray-900">{vertical.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{vertical.description}</p>
                  {vertical.exampleRevenue && (
                    <div className="text-xs text-gray-500 mt-2">
                      Example: ${(vertical.exampleRevenue / 1000).toFixed(0)}K revenue
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Waitlist Verticals */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">⏳</span>
              Waitlist Verticals (Coming Soon)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {waitlistVerticals.slice(0, 6).map((vertical) => (
                <div
                  key={vertical.id}
                  className="p-3 rounded-lg bg-white border border-gray-200 opacity-60 cursor-not-allowed"
                >
                  <div className="text-xl mb-1">{vertical.emoji || '📊'}</div>
                  <h4 className="font-semibold text-gray-700 text-sm">{vertical.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">Available in {vertical.comingSoonDate}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              📋 {waitlistVerticals.length - 6} more verticals in development. Join the waitlist for updates.
            </p>
          </div>
        </section>

        {/* Calculator Section - Shows when vertical selected */}
        {selectedVertical && exampleData && (
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {exampleData.businessName || 'Business'} - {exampleData.vertical?.verticalName}
            </h2>
            <p className="text-gray-600 mb-6">
              {exampleData.businessDescription}
            </p>

            {/* Example Data Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Financial Metrics */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Financial Metrics</h3>
                <div className="space-y-3">
                  {exampleData.metrics && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Annual Revenue</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${(exampleData.metrics.annualRevenue / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Net Margin</p>
                        <p className={`text-xl font-bold ${
                          (exampleData.metrics.netMargin || 0) > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {((exampleData.metrics.netMargin || 0) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Net Profit</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${(exampleData.metrics.netProfit / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Unit Economics */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Unit Economics</h3>
                <div className="space-y-3">
                  {exampleData.unitEconomics && (
                    <>
                      {exampleData.unitEconomics.customerAcquisitionCost && (
                        <div>
                          <p className="text-sm text-gray-600">CAC</p>
                          <p className="text-xl font-bold text-gray-900">
                            ${exampleData.unitEconomics.customerAcquisitionCost.toFixed(0)}
                          </p>
                        </div>
                      )}
                      {exampleData.unitEconomics.customerLifetimeValue && (
                        <div>
                          <p className="text-sm text-gray-600">LTV</p>
                          <p className="text-xl font-bold text-gray-900">
                            ${exampleData.unitEconomics.customerLifetimeValue.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {exampleData.unitEconomics.ltvToCacRatio && (
                        <div>
                          <p className="text-sm text-gray-600">LTV:CAC Ratio</p>
                          <p className="text-xl font-bold text-indigo-600">
                            {exampleData.unitEconomics.ltvToCacRatio.toFixed(1)}:1
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Constraints */}
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Primary Constraint</h3>
                {exampleData.constraints && (
                  <div>
                    <div className="inline-block bg-orange-200 text-orange-900 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {exampleData.constraints.primaryConstraint}
                    </div>
                    <div className="space-y-2">
                      {exampleData.constraints.constraints?.map((constraint, idx) => (
                        <p key={idx} className="text-sm text-gray-700">
                          • {constraint}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">
                View Full Playbook
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-semibold">
                Analyze This Business
              </button>
            </div>
          </section>
        )}

        {/* Info Section */}
        {!selectedVertical && (
          <section className="bg-indigo-50 rounded-lg p-8 border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📊 How It Works</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ <strong>Select your vertical</strong> from featured service business types</li>
              <li>✓ <strong>View real case study data</strong> from similar businesses</li>
              <li>✓ <strong>Understand your constraint</strong> using Growth Physics formulas</li>
              <li>✓ <strong>Follow the playbook</strong> with specific growth recommendations</li>
            </ul>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm">
            Growth Physics Calculator • Powered by real business case studies • 8 featured verticals • {waitlistVerticals.length} more coming soon
          </p>
        </div>
      </footer>
    </div>
  );
}
