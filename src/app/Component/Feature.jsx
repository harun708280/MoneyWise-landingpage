import Container from '@/components/global/container';
import SectionBadge from '@/components/ui/section-badge';
import { Bell, Calendar, ClipboardCheck, PieChart, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

// Features List
const features = [
    {
        icon: <ClipboardCheck className="w-8 h-8 text-white" />, 
        title: "Task Tracking",
        description: "Keep track of all your tasks in one place with real-time updates and progress monitoring."
    },
    {
        icon: <Users className="w-8 h-8 text-white" />, 
        title: "Team Collaboration",
        description: "Assign tasks, communicate with teammates, and collaborate seamlessly to enhance productivity."
    },
    {
        icon: <Bell className="w-8 h-8 text-white" />, 
        title: "Real-time Notifications",
        description: "Stay updated with instant notifications for task updates, deadlines, and team messages."
    },
    {
        icon: <Calendar className="w-8 h-8 text-whitey" />, 
        title: "Deadline Reminders",
        description: "Never miss a deadline with automated task reminders and scheduling tools."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-white" />, 
        title: "Secure Data",
        description: "Your tasks and team data are encrypted and stored securely with the latest security measures."
    },
    {
        icon: <PieChart className="w-8 h-8 text-white" />, 
        title: "Analytics & Reports",
        description: "Gain insights into task completion rates, team performance, and productivity with detailed reports."
    }
];

const Feature = () => {
    return (
        <div className="flex flex-col  items-center justify-center py-12 relative">
            <Container>
                <div className="max-w-xl mx-auto text-start md:text-center">
                    <SectionBadge title="Features" />
                    <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                        Enhance Team Collaboration
                    </h2>
                    <p className="text-muted-foreground mt-6">
                        Work together seamlessly, assign tasks, and improve productivity in real time.
                    </p>
                </div>
            </Container>
            
            {/* Feature Image */}
            <Container>
                <div className="flex items-center justify-center mx-auto mt-8">
                    <Image src={'/feature.svg'} height={80} width={300} alt="Feature Image" />
                </div>
            </Container>

            {/* Feature List */}
            <Container>
                <div className="flex container flex-col items-center justify-center py-10 md:py-20 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-start lg:items-start px-0 md:px-0">
                                {/* Fix: Directly render the icon */}
                                <div className="flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-medium mt-4">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground mt-2 text-start lg:text-start">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Feature;
