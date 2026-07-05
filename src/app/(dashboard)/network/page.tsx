"use client";

import { Users, Building2, MapPin, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { companyDistribution, branchDistribution, countryDistribution } from "@/lib/data/mock-data";

const PIE_COLORS = ['#002855', '#DA291C', '#4A90E2', '#50E3C2', '#F5A623', '#9B9B9B', '#D0021B', '#8B572A', '#417505'];

export default function NetworkGraphPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#002855]">NSUT Alumni Network</h1>
        <p className="text-gray-600 mt-1">Explore where NSUT alumni are making an impact globally.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <Users className="w-6 h-6 text-[#002855] mb-2" />
            <p className="text-2xl font-bold text-gray-900">782</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Total Alumni</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <MapPin className="w-6 h-6 text-[#DA291C] mb-2" />
            <p className="text-2xl font-bold text-gray-900">10+</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Countries</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <Building2 className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-2xl font-bold text-gray-900">50+</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Companies</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <GraduationCap className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-2xl font-bold text-gray-900">9</p>
            <p className="text-xs text-gray-500 uppercase font-semibold">Branches</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-[#002855]">Alumni by Company</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                  />
                  <Bar dataKey="count" fill="#002855" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-[#002855]">Alumni by Branch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={branchDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {branchDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{fontSize: '12px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-gray-100 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-[#002855]">Alumni by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryDistribution} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{fontSize: 12}} />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                  />
                  <Bar dataKey="count" fill="#DA291C" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
