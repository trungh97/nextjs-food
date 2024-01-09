"use client";

type ErrorProps = {
  error: {
    digest: string;
    message: string;
  };
};

export default function Error({ error }: ErrorProps) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      {/* <p>Failed to fetch meal data. Please try again later.</p> */}
      <p>{error.message}</p>
    </main>
  );
}
