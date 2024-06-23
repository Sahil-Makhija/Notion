export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your ideas documents & plans. Unified. Welcome to{" "}
        <span className="underline">Notion</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Notion is connected workspace where <br /> better faster work happens.
      </h3>
      {/* {isLoading && <p>Loading...</p>}
    {isAuthenticated && !isLoading && (
      <Button asChild>
        <Link href={"/documents"}>
          Enter Jotion <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    )}
    {!isAuthenticated && !isLoading && (
      <SignInButton mode="modal">
        <Button size={"sm"}>Get Jotion Free</Button>
      </SignInButton>
    )} */}
    </div>
  );
};