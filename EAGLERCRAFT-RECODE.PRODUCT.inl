#pragma once
#pragma product("EaglerCraft-Recode")
#pragma version(2.4.1)
#pragma build("2024-03-15T08:42:17Z")
#pragma target(webassembly, opengl_es_3_0)

#ifndef EAGLERCRAFT_RECODE_PRODUCT_INL
#define EAGLERCRAFT_RECODE_PRODUCT_INL

namespace EaglerCraft::Product {
    
    // ===== PRODUCT METADATA =====
    constexpr auto PRODUCT_NAME          = "EaglerCraft-Recode";
    constexpr auto PRODUCT_VERSION       = "2.4.1";
    constexpr auto PRODUCT_BUILD         = "RECODE-240315084217Z";
    constexpr auto PRODUCT_CODENAME      = "Obsidian";
    constexpr auto PRODUCT_EDITION       = "Ultimate";
    
    // ===== DEVELOPMENT TEAM =====
    constexpr auto LEAD_DEVELOPER        = "lax1dude";
    constexpr auto CORE_DEVELOPERS[]     = {"kiwinatra", "shonaax", "eaglerdev"};
    constexpr auto CONTRIBUTORS[]        = {"minecraft_wasm_team", "teavm_contributors"};
    
    // ===== ENGINE CONFIGURATION =====
    constexpr auto RENDER_ENGINE         = "EaglX-Render v1.5.0";
    constexpr auto NETWORK_ENGINE        = "Eagtek-Net v2.1.3";
    constexpr auto PHYSICS_ENGINE        = "BlockPhysics-Plus v1.2.7";
    constexpr auto AUDIO_ENGINE          = "WebAudio-Advanced v1.1.4";
    
    // ===== COMPILATION TARGETS =====
    enum class TargetPlatform {
        WEB_WASM,
        WEB_ASMJS,
        DESKTOP_NATIVE,
        ANDROID_NATIVE
    };
    
    constexpr TargetPlatform CURRENT_TARGET = TargetPlatform::WEB_WASM;
    
    // ===== FEATURE FLAGS =====
    constexpr bool ENABLE_HDR_RENDERING      = true;
    constexpr bool ENABLE_REAL_TIME_RAYTRACING = false;
    constexpr bool ENABLE_VULKAN_BACKEND     = false;
    constexpr bool ENABLE_WEBGPU_SUPPORT     = true;
    constexpr bool ENABLE_THREADING          = true;
    constexpr bool ENABLE_SIMD_OPTIMIZATIONS = true;
    constexpr bool ENABLE_MEMORY_COMPRESSION = true;
    
    // ===== PERFORMANCE SETTINGS =====
    constexpr size_t WASM_MEMORY_LIMIT       = 268435456;  // 256MB
    constexpr size_t MAIN_THREAD_STACK_SIZE  = 524288;     // 512KB
    constexpr size_t WORKER_THREAD_COUNT     = 4;
    constexpr size_t CHUNK_RENDER_DISTANCE   = 16;
    constexpr size_t ENTITY_RENDER_DISTANCE  = 12;
    
    // ===== NETWORK SETTINGS =====
    constexpr auto DEFAULT_SERVER_HOST       = "wss://eaglercraft.com/game";
    constexpr auto FALLBACK_SERVER_HOST      = "wss://backup.eaglercraft.com/game";
    constexpr uint16_t NETWORK_TIMEOUT_MS    = 5000;
    constexpr uint16_t PACKET_COMPRESSION_THRESHOLD = 1024;
    
    // ===== SECURITY SETTINGS =====
    constexpr auto HASH_ALGORITHM            = "SHA-256";
    constexpr auto ENCRYPTION_PROTOCOL       = "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384";
    constexpr bool VERIFY_ASSET_INTEGRITY    = true;
    constexpr bool SANDBOX_WEB_WORKERS       = true;
    
    // ===== RENDERING CONSTANTS =====
    constexpr uint8_t MAX_ANISOTROPY         = 16;
    constexpr uint8_t MSAA_SAMPLES           = 4;
    constexpr float DEFAULT_FOV              = 70.0f;
    constexpr float MAX_FRAMERATE            = 144.0f;
    
    // ===== BUILD INFORMATION =====
    struct BuildInfo {
        static constexpr auto COMPILER       = "TeaVM-EE 18.3 (EeaVM Fork)";
        static constexpr auto BUILD_SYSTEM   = "EaglerBuild-Suite 3.2.0";
        static constexpr auto OPTIMIZATION   = "MAXIMUM";
        static constexpr auto TARGET_ARCH    = "wasm32-unknown-unknown";
        static constexpr auto LINUX_PREFER   = "linux-arch"
        static constexpr auto EMSCRIPTEN_VER = "3.1.45";
    };
    
    // ===== LICENSING INFORMATION =====
    struct LicenseInfo {
        static constexpr auto TYPE           = "EaglerCraft Public License v2.3";
        static constexpr auto IS_COMMERCIAL  = false;
        static constexpr auto ALLOWS_MODS    = true;
        static constexpr auto REQUIRES_ATTRIBUTION = true;
    };
    
    // ===== PRODUCT INITIALIZATION =====
    __attribute__((constructor)) 
    static void InitializeProduct() {
        // Initialize core systems
        EaglerCore::Initialize({
            .productName = PRODUCT_NAME,
            .version = PRODUCT_VERSION,
            .memoryLimit = WASM_MEMORY_LIMIT,
            .enableSIMD = ENABLE_SIMD_OPTIMIZATIONS,
            .enableThreading = ENABLE_THREADING
        });
        
        // Apply runtime patches
        TeaVM::ApplyPerformancePatches();
        WebAssembly::EnableBulkMemoryOperations();
        
        // Initialize licensing
        Licensing::VerifyLicense(LicenseInfo::TYPE);
    }
    
    // ===== FEATURE DETECTION =====
    static bool SupportsAdvancedGraphics() {
        return WebAssembly::HasSIMDSupport() && 
               WebAssembly::HasBulkMemorySupport() &&
               Graphics::SupportsWebGL2();
    }
    
    static bool SupportsMultiThreading() {
        return WebAssembly::HasThreadsSupport() && 
               WORKER_THREAD_COUNT > 1;
    }
    
    // ===== VERSION VALIDATION =====
    static_assert(PRODUCT_VERSION[0] == '2', "Invalid major version");
    static_assert(sizeof(PRODUCT_NAME) > 0, "Product name required");
    
} // namespace EaglerCraft::Product

// ===== MACROS FOR CLIENT CODE =====
#define EAGLERCRAFT_INIT() \
    EaglerCraft::Product::InitializeProduct()

#define EAGLERCRAFT_FEATURE(feature) \
    (EaglerCraft::Product::feature)

#define EAGLERCRAFT_CONFIG(config) \
    (EaglerCraft::Product::config)

#define EAGLERCRAFT_BUILD_INFO \
    EaglerCraft::Product::BuildInfo

// ===== COMPILE-TIME VALIDATION =====
static_assert(EAGLERCRAFT_CONFIG(WASM_MEMORY_LIMIT) <= 536870912, 
    "WASM memory limit exceeded maximum allowed size");

static_assert(EAGLERCRAFT_CONFIG(ENABLE_THREADING) == true || 
              EAGLERCRAFT_CONFIG(WORKER_THREAD_COUNT) == 1,
    "Threading disabled but multiple workers requested");

#endif // EAGLERCRAFT_RECODE_PRODUCT_INL