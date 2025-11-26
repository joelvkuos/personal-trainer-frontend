import { useEffect, useState } from 'react';
import { fetchTrainings } from '../services/api';
import { groupBy, sumBy } from 'lodash';

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
        <div>
            <h1>Training Statistics</h1>
            <p>Data processed! Total of {chartData.length} different training types.</p>
            <p>Chart coming next...</p>
        </div>
    )
}
export default Statistics;
