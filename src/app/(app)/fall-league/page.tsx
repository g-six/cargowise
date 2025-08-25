import FormHeader from "./form-header";

export default async function FallLeaguePage() {
    return (<>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <FormHeader />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Fall League Series</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            This is the Fall League page content.
        </p>
        </div>
    </>
    );
}