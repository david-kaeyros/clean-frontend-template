import {setupCompaniesDependencies} from "@/src/modules/companies/infra/di/SetupCompaniesDependencies";

let appInitialized = false;

/**
* Initialize all application dependencies
* This is called automatically when the module is imported
*/
export function initializeAppDependencies(){
    if (appInitialized) {
        console.log('⚠️  App dependencies already initialized');
        return;
    }

    console.log('🚀 Initializing application dependencies...');
    const startTime = performance.now();

    try {
        // Initialize all module dependencies
        setupCompaniesDependencies();
        // Add more modules here as you create them...

        appInitialized = true;

        const duration = (performance.now() - startTime).toFixed(2);
        console.log(`✅ Application initialized successfully in ${duration}ms`);
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
        throw new Error(
            'Application initialization failed. Please check the console and refresh the page.'
        );
    }
}

export function isAppInitialized(): boolean {
    return appInitialized;
}

initializeAppDependencies();