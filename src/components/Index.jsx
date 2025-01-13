import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import useFetch from '../hook/useFetch';
import Loading from './Loading';

export default function ChartsOverviewDemo() {
    const token = localStorage.getItem('tracker-token');
    const userData = useFetch('https://tracker-gamma-nine.vercel.app/api/user/category-summary', token);

    return (
        <>
            <div>
                <div>
                    {userData?.userInfo?.categoryExpenses && userData?.userInfo?.categoryName ? (
                        <BarChart
                            series={[{ data: userData.userInfo.categoryExpenses }]}
                            height={290}
                            xAxis={[{ data: userData.userInfo.categoryName, scaleType: 'band' }]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        />
                    ) : (
                        <div className='flex items-center justify-center h-72 w-full'>
                            <Loading />
                        </div>
                    )}
                </div>
                <div className='flex flex-col items-center justify-center mt-5'>
                    <div>
                        <h1 className="md:text-xl text-md ">Today Most Spent On: <span className='text-red-500 underline font-semibold'>{userData?.userInfo?.mostSpent}</span></h1>
                    </div>

                </div>
            </div>
        </>
    );
}
