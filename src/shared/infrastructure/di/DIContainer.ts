
/**
 * Generic Dependency Injection Container
 * Can be used by any module with full type safety
 */
export class DIContainer<TServiceRegistry> {
    private services = new Map<keyof TServiceRegistry, any>();
    private singletons = new Map<keyof TServiceRegistry, any>();
    private initialized = false;
    private readonly moduleName: string;

    constructor(moduleName: string) {
        this.moduleName = moduleName;
    }

    /**
     * Register a factory (creates new instance each time)
     * Use this for: Use Cases, Services
     */
    register<K extends keyof TServiceRegistry>(
        key: K,
        factory: () => TServiceRegistry[K]
    ): void {
        if (this.initialized) {
            console.warn(
                `⚠️  [${this.moduleName}] Registering "${String(key)}" after initialization`
            );
        }
        this.services.set(key, factory);
    }

    /**
     * Register a singleton (same instance every time)
     * Use this for: Repositories, API Clients, Database Connections
     */
    registerSingleton<K extends keyof TServiceRegistry>(
        key: K,
        instance: TServiceRegistry[K]
    ): void {
        if (this.initialized) {
            console.warn(
                `⚠️  [${this.moduleName}] Registering singleton "${String(key)}" after initialization`
            );
        }
        this.singletons.set(key, instance);
    }

    /**
     * Resolve a service with full type safety
     */
    resolve<K extends keyof TServiceRegistry>(key: K): TServiceRegistry[K] {
        if (!this.initialized) {
            throw new Error(
                `❌ [${this.moduleName}] DI Container not initialized! ` +
                `Call the setup function before resolving "${String(key)}"`
            );
        }

        // Check singletons first
        if (this.singletons.has(key)) {
            return this.singletons.get(key)!;
        }

        // Then check factories
        const factory = this.services.get(key);
        if (!factory) {
            throw new Error(
                `❌ [${this.moduleName}] Service "${String(key)}" not registered in DI container`
            );
        }

        return factory();
    }

    /**
     * Mark container as initialized (prevents accidental usage before setup)
     */
    markAsInitialized(): void {
        this.initialized = true;
        console.log(`✅ [${this.moduleName}] DI Container initialized`);
    }

    /**
     * Check if container is initialized
     */
    isInitialized(): boolean {
        return this.initialized;
    }

    /**
     * Get the module name
     */
    getModuleName(): string {
        return this.moduleName;
    }

    /**
     * Reset the container (useful for testing)
     */
    reset(): void {
        this.services.clear();
        this.singletons.clear();
        this.initialized = false;
        console.log(`🔄 [${this.moduleName}] DI Container reset`);
    }

    /**
     * Get all registered service keys (useful for debugging)
     */
    getRegisteredServices(): string[] {
        const serviceKeys = Array.from(this.services.keys()).map(String);
        const singletonKeys = Array.from(this.singletons.keys()).map(String);
        return [...serviceKeys, ...singletonKeys];
    }
}
