export default function Section({ className, children }) {
  return (
    <>
      <div className={"w-100 min-vh-100 mx-auto " + className}>{children}</div>
    </>
  );
}
