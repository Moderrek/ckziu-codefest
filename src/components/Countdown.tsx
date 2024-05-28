const Countdown = () => {
  return (
    <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span className="countdown font-mono text-5xl">
          {/*<span style={{ '--value': 15 }}></span>*/}
        </span>
        days
      </div>
      <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span className="countdown font-mono text-5xl">
          {/*<span style={{ '--value': 10 }}></span>*/}
        </span>
        hours
      </div>
      <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span className="countdown font-mono text-5xl">
          {/*<span style={{ '--value': 24 }}></span>*/}
        </span>
        min
      </div>
      <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span className="countdown font-mono text-5xl">
          {/*<span style={{ '--value': 33 }}></span>*/}
        </span>
        sec
      </div>
    </div>
  );
};

export { Countdown };
