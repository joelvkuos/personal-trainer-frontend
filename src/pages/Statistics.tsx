import { useEffect, useState } from 'react';
import { fetchTrainings } from '../services/api';
import { groupBy, sumBy } from 'lodash';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatisticData {
    activity: string;
    duration: number;
}

function Statistics() {
    const [chartData, setChartData] = useState<StatisticData[]>([]);


    useEffect(() => {
        fetchTrainings()
            .then(trainings => {
                const grouped = groupBy(trainings, 'activity');
                const processed = Object.entries(grouped).map(([activity, group]) => ({
                    activity: activity,
                    duration: sumBy(group, 'duration')
                }));
                setChartData(processed);
            })
            .catch(error => console.error('Error fetching trainings:', error));
    }, []);

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Training Statistics</h1>
            <p>Total duration by activity (minutes)</p>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Statistics;
