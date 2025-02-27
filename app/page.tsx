"use client";
import { ChangeEvent, FormEvent, useState } from 'react';
import { ProgressBar } from './components/progress-bar';

export default function Home() {

  const [progressBarData, setProgressBarData] = useState([{ value: 0, color: 'bg-red-500' }]);
  const [progressBarCount, setProgressBarCount] = useState(1);
  
  const [progressBarColor, setProgressBarColor] = useState('red');
  const [progressBarToUpdate, setProgressBarToUpdate] = useState(1);
  const [progressBarValue, setProgressBarValue] = useState(0);


  const generateProgressBars = (count: number) => {
    const progressBars = [];
    for (let i = 0; i < count; i++) {
      progressBars.push({ value: 0, color: 'bg-red-500' });
    }
    setProgressBarData(progressBars);
    setProgressBarToUpdate(1);
  }

  const updateProgressCount = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const count = parseInt((e.target as HTMLInputElement).value || '1', 10);
      setProgressBarCount(count);
    }
    catch (error) {
      console.error(error);
      setProgressBarCount(1);
    }
  }

  const applyProgress = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // UnComment If it the Progress Needs to be Persisted
    // const progressBars = progressBarData.map((progressBar, index) => {
    //   if (index === progressBarToUpdate - 1) {
    //     return { value: progressBarValue, color: `bg-${progressBarColor}-500` };
    //   }
    //   return progressBar;
    // });
    // setProgressBarData(progressBars);

    // But As per Requirement: Reset the ProgressBars and only update the selected Progress Bar
    const progressBars = progressBarData.map((progressBar, index) => {
      if (index === progressBarToUpdate - 1) {
        return { value: progressBar.value + progressBarValue, color: `bg-${progressBarColor}-500` };
      } else {
        return { value: 0, color: 'bg-red-500' };
      }
    });
    setProgressBarData(progressBars);
  }

  return (
    <div className="p-8">

      <div className="mb-4 max-w-[400px] flex gap-8">
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="progressBarCount">
          Number of Progress Bars:
          </label>
          <input className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="progressBarCount" type="number" min={1} max={100} placeholder="1-100" value={progressBarCount} onChange={(e) => updateProgressCount(e)}  />
        </div>
        <div className="flex items-end flex-1">
          <button className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-xl mt-4" onClick={() => generateProgressBars(progressBarCount)}>
            Generate
          </button>
        </div>
      </div>



      <h3 className="text-lg font-bold mt-8 mb-4">Update Progress</h3>
      <div className="mb-4 flex gap-8">
        <form className="w-2/3 flex gap-8" onSubmit={(e) => applyProgress(e)}>
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="progressBarCount">
              Select Progress Bar to Update:
            </label>
            <input className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="progressBarCount" type="number" min={1} max={progressBarCount} placeholder="Progress Bar Index" value={progressBarToUpdate} onChange={(e) => setProgressBarToUpdate(parseInt((e.target as HTMLInputElement).value || '1', 10))} />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="progressBarCount">
              Choose Color:
            </label>
            <div className=" flex gap-4 items-center">
              <div className="flex gap-2 bg-red-500 p-2 pr-3 rounded-md">
                <input type="radio" id="red" name="color" value="red" defaultChecked={progressBarColor === 'red'} onClick={() => setProgressBarColor('red')}/>
                <label htmlFor="red" className="text-gray-700 text-sm font-bold text-white">Red</label>
              </div>
              <div className="flex gap-2 bg-green-500 p-2 pr-3 rounded-md">
                <input type="radio" id="green" name="color" value="green" defaultChecked={progressBarColor === 'green'} onClick={() => setProgressBarColor('green')}/>
                <label htmlFor="green" className="text-gray-700 text-sm font-bold text-white">Green</label>
              </div>
              <div className="flex gap-2 bg-blue-500 p-2 pr-3 rounded-md">
                <input type="radio" id="blue" name="color" value="blue" defaultChecked={progressBarColor === 'blue'} onClick={() => setProgressBarColor('blue')}/>
                <label htmlFor="blue" className="text-gray-700 text-sm font-bold text-white">Blue</label>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProgressBarValue">
              Progress Bar Value:
            </label>
            <input className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ProgressBarValue" type="number" min={0} max={100} placeholder="Progress Bar Value" value={progressBarValue} onChange={(e) => setProgressBarValue(parseInt((e.target as HTMLInputElement).value || '0', 10))} />
          </div>
          <div className="flex items-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-xl mt-4">
              Make Progress
            </button>
          </div>
        </form>
      </div>


      <h3 className="text-lg font-bold mt-8 mb-4">Progress Bars</h3>
      <div className="flex flex-col gap-4 max-w-[400px]">
        {progressBarData.map((progressBar, index) => (
          <ProgressBar key={index} value={progressBar.value} color={progressBar.color} />
        ))}
      </div>

    </div>
  );
}
