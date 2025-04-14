const { Product, Category } = require("../models");

module.exports = async () => {
  try {
    const categories = {
      Earbuds: await Category.findOne({ where: { name: "Earbuds" } }),
      Headphones: await Category.findOne({ where: { name: "Headphones" } }),
      Speakers: await Category.findOne({ where: { name: "Speakers" } }),
      Accessories: await Category.findOne({ where: { name: "Accessories" } }),
    };
    const products = [
      {
        name: "Powerbeats Pro 2 Jet Black",
        price: 249.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/powerbeats-pro-2/pdp/product-carousel/jet-black/pc-pbpro2-jet-black-p01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Powerbeats Pro 2 feature a built-in heart rate monitor, compatible with select third-party apps, and offer up to 8 hours of audio playback on a full charge (36 hours with the charging case). They are sweat and water-resistant (IPX4), but not suitable for water sports, and the charging case is not water-resistant. Regular cleaning is recommended to maintain optimal performance and noise cancellation/transparency functionality. Setup and usage of the Powerbeats Pro 2 vary between iOS and Android devices. On iOS, heart rate sessions start and end automatically, while on Android, the user must manually initiate them. The Beats app allows disabling the heart rate monitor on Android, and on iOS, it can be done through iPhone settings. Additionally, the earbuds support Personalized Spatial Audio and Dolby Atmos, requiring compatible devices and content. The Powerbeats Pro 2 offer fast charging, providing up to 1 hour of playback with just 5 minutes of charging via USB-C. They also support Qi wireless charging. To maximize their features, compatible hardware and software are required, including iOS 18, iPadOS 18, macOS Sequoia, or Android 9.0 or later, depending on the functionalities. New subscribers can get 3 months of Apple Music for free when connecting the earbuds to a compatible Apple device.",
        stock: 130,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Powerbeats Pro 2 Quick Sand",
        price: 249.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/powerbeats-pro-2/pdp/product-carousel/quick-sand/pc-pbpro2-quick-sand-p01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Powerbeats Pro 2 feature a built-in heart rate monitor, compatible with select third-party apps, and offer up to 8 hours of audio playback on a full charge (36 hours with the charging case). They are sweat and water-resistant (IPX4), but not suitable for water sports, and the charging case is not water-resistant. Regular cleaning is recommended to maintain optimal performance and noise cancellation/transparency functionality. Setup and usage of the Powerbeats Pro 2 vary between iOS and Android devices. On iOS, heart rate sessions start and end automatically, while on Android, the user must manually initiate them. The Beats app allows disabling the heart rate monitor on Android, and on iOS, it can be done through iPhone settings. Additionally, the earbuds support Personalized Spatial Audio and Dolby Atmos, requiring compatible devices and content. The Powerbeats Pro 2 offer fast charging, providing up to 1 hour of playback with just 5 minutes of charging via USB-C. They also support Qi wireless charging. To maximize their features, compatible hardware and software are required, including iOS 18, iPadOS 18, macOS Sequoia, or Android 9.0 or later, depending on the functionalities. New subscribers can get 3 months of Apple Music for free when connecting the earbuds to a compatible Apple device.",
        stock: 200,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Powerbeats Pro 2 Hyper Purple",
        price: 249.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/powerbeats-pro-2/pdp/product-carousel/hyper-purple/pc-pbpro2-hyper-purple-p01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Powerbeats Pro 2 feature a built-in heart rate monitor, compatible with select third-party apps, and offer up to 8 hours of audio playback on a full charge (36 hours with the charging case). They are sweat and water-resistant (IPX4), but not suitable for water sports, and the charging case is not water-resistant. Regular cleaning is recommended to maintain optimal performance and noise cancellation/transparency functionality. Setup and usage of the Powerbeats Pro 2 vary between iOS and Android devices. On iOS, heart rate sessions start and end automatically, while on Android, the user must manually initiate them. The Beats app allows disabling the heart rate monitor on Android, and on iOS, it can be done through iPhone settings. Additionally, the earbuds support Personalized Spatial Audio and Dolby Atmos, requiring compatible devices and content. The Powerbeats Pro 2 offer fast charging, providing up to 1 hour of playback with just 5 minutes of charging via USB-C. They also support Qi wireless charging. To maximize their features, compatible hardware and software are required, including iOS 18, iPadOS 18, macOS Sequoia, or Android 9.0 or later, depending on the functionalities. New subscribers can get 3 months of Apple Music for free when connecting the earbuds to a compatible Apple device.",
        stock: 150,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Powerbeats Pro 2 Electric Orange",
        price: 249.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/powerbeats-pro-2/pdp/product-carousel/electric-orange/pc-pbpro2-electric-orange-p01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Powerbeats Pro 2 feature a built-in heart rate monitor, compatible with select third-party apps, and offer up to 8 hours of audio playback on a full charge (36 hours with the charging case). They are sweat and water-resistant (IPX4), but not suitable for water sports, and the charging case is not water-resistant. Regular cleaning is recommended to maintain optimal performance and noise cancellation/transparency functionality. Setup and usage of the Powerbeats Pro 2 vary between iOS and Android devices. On iOS, heart rate sessions start and end automatically, while on Android, the user must manually initiate them. The Beats app allows disabling the heart rate monitor on Android, and on iOS, it can be done through iPhone settings. Additionally, the earbuds support Personalized Spatial Audio and Dolby Atmos, requiring compatible devices and content. The Powerbeats Pro 2 offer fast charging, providing up to 1 hour of playback with just 5 minutes of charging via USB-C. They also support Qi wireless charging. To maximize their features, compatible hardware and software are required, including iOS 18, iPadOS 18, macOS Sequoia, or Android 9.0 or later, depending on the functionalities. New subscribers can get 3 months of Apple Music for free when connecting the earbuds to a compatible Apple device.",
        stock: 180,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Studio Pro Black",
        price: 349.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/studiopro-wireless/pdp/product-carousel/black/alt/black-01-studiopro-cnet.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Studio Pro headphones offer up to 40 hours of listening time without Active Noise Cancellation (ANC) or Transparency, and up to 24 hours with ANC enabled, based on Apple's testing. They support Spatial Audio with personalized profiles (requiring an iPhone with TrueDepth camera) and Dolby Atmos, though content and device compatibility are necessary. The headphones also feature lossless audio via USB-C when used with compatible devices and content. Battery life varies depending on usage and settings. These headphones integrate seamlessly with both Apple and Android ecosystems. Apple users benefit from iCloud syncing, Siri functionality, and Find My Beats integration, while Android users can utilize Google Fast Pair, Audio Switch, and Find My Device. Both platforms require compatible software and hardware, including specific iOS, iPadOS, macOS, or Android versions with Google Play Services enabled. Additionally, new Apple Music subscribers can get three months free when connecting the Beats Studio Pro to a compatible Apple device. The headphones also support fast charging, providing up to 4 hours of playback with a 10-minute charge. However, features like lossless audio, Spatial Audio, and Siri may have specific requirements or regional limitations.",
        stock: 210,
        categoryId: categories.Headphones?.id,
      },
      {
        name: "Beats Studio Pro Deep Brown",
        price: 349.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/studiopro-wireless/pdp/product-carousel/deep-brown/alt/brown-01-studiopro-cnet.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Studio Pro headphones offer up to 40 hours of listening time without Active Noise Cancellation (ANC) or Transparency, and up to 24 hours with ANC enabled, based on Apple's testing. They support Spatial Audio with personalized profiles (requiring an iPhone with TrueDepth camera) and Dolby Atmos, though content and device compatibility are necessary. The headphones also feature lossless audio via USB-C when used with compatible devices and content. Battery life varies depending on usage and settings. These headphones integrate seamlessly with both Apple and Android ecosystems. Apple users benefit from iCloud syncing, Siri functionality, and Find My Beats integration, while Android users can utilize Google Fast Pair, Audio Switch, and Find My Device. Both platforms require compatible software and hardware, including specific iOS, iPadOS, macOS, or Android versions with Google Play Services enabled. Additionally, new Apple Music subscribers can get three months free when connecting the Beats Studio Pro to a compatible Apple device. The headphones also support fast charging, providing up to 4 hours of playback with a 10-minute charge. However, features like lossless audio, Spatial Audio, and Siri may have specific requirements or regional limitations.",
        stock: 100,
        categoryId: categories.Headphones?.id,
      },
      {
        name: "Beats Studio Pro Navy",
        price: 349.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/studiopro-wireless/pdp/product-carousel/navy/alt/navy-01-studiopro-cnet.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Studio Pro headphones offer up to 40 hours of listening time without Active Noise Cancellation (ANC) or Transparency, and up to 24 hours with ANC enabled, based on Apple's testing. They support Spatial Audio with personalized profiles (requiring an iPhone with TrueDepth camera) and Dolby Atmos, though content and device compatibility are necessary. The headphones also feature lossless audio via USB-C when used with compatible devices and content. Battery life varies depending on usage and settings. These headphones integrate seamlessly with both Apple and Android ecosystems. Apple users benefit from iCloud syncing, Siri functionality, and Find My Beats integration, while Android users can utilize Google Fast Pair, Audio Switch, and Find My Device. Both platforms require compatible software and hardware, including specific iOS, iPadOS, macOS, or Android versions with Google Play Services enabled. Additionally, new Apple Music subscribers can get three months free when connecting the Beats Studio Pro to a compatible Apple device. The headphones also support fast charging, providing up to 4 hours of playback with a 10-minute charge. However, features like lossless audio, Spatial Audio, and Siri may have specific requirements or regional limitations.",
        stock: 143,
        categoryId: categories.Headphones?.id,
      },
      {
        name: "Beats Studio Pro Sandstone",
        price: 349.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/studiopro-wireless/pdp/product-carousel/sandstone/alt/sandstone-01-studiopro-cnet.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Studio Pro headphones offer up to 40 hours of listening time without Active Noise Cancellation (ANC) or Transparency, and up to 24 hours with ANC enabled, based on Apple's testing. They support Spatial Audio with personalized profiles (requiring an iPhone with TrueDepth camera) and Dolby Atmos, though content and device compatibility are necessary. The headphones also feature lossless audio via USB-C when used with compatible devices and content. Battery life varies depending on usage and settings. These headphones integrate seamlessly with both Apple and Android ecosystems. Apple users benefit from iCloud syncing, Siri functionality, and Find My Beats integration, while Android users can utilize Google Fast Pair, Audio Switch, and Find My Device. Both platforms require compatible software and hardware, including specific iOS, iPadOS, macOS, or Android versions with Google Play Services enabled. Additionally, new Apple Music subscribers can get three months free when connecting the Beats Studio Pro to a compatible Apple device. The headphones also support fast charging, providing up to 4 hours of playback with a 10-minute charge. However, features like lossless audio, Spatial Audio, and Siri may have specific requirements or regional limitations.",
        stock: 103,
        categoryId: categories.Headphones?.id,
      },
      {
        name: "Beats Solo 4 Matte Black",
        price: 199.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo4-wireless/pdp/product-carousel/matte-black/black-01-solo4-cnet.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Solo 4 headphones boast extended battery life, tested by Apple to provide significant playback time under controlled conditions, with volume set at 50% using a standard playlist. Battery life can vary based on usage and environmental factors. These headphones also support lossless audio playback via a compatible USB-C connection, provided the source material and apps support it. The Beats Solo 4 are designed to integrate seamlessly with both Apple and Android ecosystems. They offer Spatial Audio with personalized profiles (requiring an iPhone with TrueDepth camera) and Dolby Atmos support, provided compatible hardware and software are used. Apple users benefit from iCloud account integration, while Android users need a compatible device with Google Play Services. Additionally, new Apple Music subscribers can receive three months free when pairing the Beats Solo 4 with an eligible Apple device. The headphones also feature fast charging, offering a substantial amount of playback time from just a 10-minute charge. Apple emphasizes the headphones' packaging sustainability, excluding adhesives, inks, and coatings from their plastic content and weight calculations.",
        stock: 0,
        categoryId: categories.Headphones?.id,
      },
      {
        name: "Beats Solo 4 Slate Blue",
        price: 199.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo4-wireless/pdp/product-carousel/slate-blue/blue-01-solo4-cnet.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Solo 4 headphones boast extended battery life, tested by Apple to provide significant playback time under controlled conditions, with volume set at 50% using a standard playlist. Battery life can vary based on usage and environmental factors. These headphones also support lossless audio playback via a compatible USB-C connection, provided the source material and apps support it. The Beats Solo 4 are designed to integrate seamlessly with both Apple and Android ecosystems. They offer Spatial Audio with personalized profiles (requiring an iPhone with TrueDepth camera) and Dolby Atmos support, provided compatible hardware and software are used. Apple users benefit from iCloud account integration, while Android users need a compatible device with Google Play Services. Additionally, new Apple Music subscribers can receive three months free when pairing the Beats Solo 4 with an eligible Apple device. The headphones also feature fast charging, offering a substantial amount of playback time from just a 10-minute charge. Apple emphasizes the headphones' packaging sustainability, excluding adhesives, inks, and coatings from their plastic content and weight calculations.",
        stock: 39,
        categoryId: categories.Headphones?.id,
      },
      {
        name: "Beats Solo 4 Cloud Pink",
        price: 199.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo4-wireless/pdp/product-carousel/cloud-pink/pink-01-solo4-cnet.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Solo 4 headphones boast extended battery life, tested by Apple to provide significant playback time under controlled conditions, with volume set at 50% using a standard playlist. Battery life can vary based on usage and environmental factors. These headphones also support lossless audio playback via a compatible USB-C connection, provided the source material and apps support it. The Beats Solo 4 are designed to integrate seamlessly with both Apple and Android ecosystems. They offer Spatial Audio with personalized profiles (requiring an iPhone with TrueDepth camera) and Dolby Atmos support, provided compatible hardware and software are used. Apple users benefit from iCloud account integration, while Android users need a compatible device with Google Play Services. Additionally, new Apple Music subscribers can receive three months free when pairing the Beats Solo 4 with an eligible Apple device. The headphones also feature fast charging, offering a substantial amount of playback time from just a 10-minute charge. Apple emphasizes the headphones' packaging sustainability, excluding adhesives, inks, and coatings from their plastic content and weight calculations.",
        stock: 109,
        categoryId: categories.Headphones?.id,
      },
      {
        name: "Beats Solo 4 Sandy Liang Limited Edition",
        price: 199.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo4-wireless/pdp/product-carousel/sandy-liang/sandy-liang-01-solo4-cnet.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Solo 4 headphones boast extended battery life, tested by Apple to provide significant playback time under controlled conditions, with volume set at 50% using a standard playlist. Battery life can vary based on usage and environmental factors. These headphones also support lossless audio playback via a compatible USB-C connection, provided the source material and apps support it. The Beats Solo 4 are designed to integrate seamlessly with both Apple and Android ecosystems. They offer Spatial Audio with personalized profiles (requiring an iPhone with TrueDepth camera) and Dolby Atmos support, provided compatible hardware and software are used. Apple users benefit from iCloud account integration, while Android users need a compatible device with Google Play Services. Additionally, new Apple Music subscribers can receive three months free when pairing the Beats Solo 4 with an eligible Apple device. The headphones also feature fast charging, offering a substantial amount of playback time from just a 10-minute charge. Apple emphasizes the headphones' packaging sustainability, excluding adhesives, inks, and coatings from their plastic content and weight calculations.",
        stock: 144,
        categoryId: categories.Headphones?.id,
      },
      {
        name: "Beats Pill Matte Black",
        price: 149.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/speakers/beats-pill/pdp/product-carousel/black/black-01-beatspill-wired.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Pill speaker offers extended battery life, tested by Apple with a standard playlist at 50% volume, though actual battery life varies with usage and environment. It features IP67 dust and water resistance, making it suitable for both indoor and outdoor use, although this resistance may decrease over time. Lossless audio playback is supported with compatible apps and services. Beats Pill integrates with both Apple and Android ecosystems, requiring compatible operating system software and Google Play Services for Android devices. New Apple Music subscribers can receive three months free when connecting the Beats Pill to an eligible Apple device. This speaker represents an upgrade over the Beats Pill+, offering enhanced features. Additionally, the Beats Pill supports fast charging, providing a significant amount of playback time from just a 10-minute charge. As with all battery-powered devices, real-world performance will depend on specific conditions and usage patterns.",
        stock: 200,
        categoryId: categories.Speakers?.id,
      },
      {
        name: "Beats Pill Statement Red",
        price: 149.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/speakers/beats-pill/pdp/product-carousel/red/red-01-beatspill-wired.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Pill speaker offers extended battery life, tested by Apple with a standard playlist at 50% volume, though actual battery life varies with usage and environment. It features IP67 dust and water resistance, making it suitable for both indoor and outdoor use, although this resistance may decrease over time. Lossless audio playback is supported with compatible apps and services. Beats Pill integrates with both Apple and Android ecosystems, requiring compatible operating system software and Google Play Services for Android devices. New Apple Music subscribers can receive three months free when connecting the Beats Pill to an eligible Apple device. This speaker represents an upgrade over the Beats Pill+, offering enhanced features. Additionally, the Beats Pill supports fast charging, providing a significant amount of playback time from just a 10-minute charge. As with all battery-powered devices, real-world performance will depend on specific conditions and usage patterns.",
        stock: 439,
        categoryId: categories.Speakers?.id,
      },
      {
        name: "Beats Pill Champagne Gold",
        price: 149.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/speakers/beats-pill/pdp/product-carousel/gold/gold-01-beatspill-wired.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Pill speaker offers extended battery life, tested by Apple with a standard playlist at 50% volume, though actual battery life varies with usage and environment. It features IP67 dust and water resistance, making it suitable for both indoor and outdoor use, although this resistance may decrease over time. Lossless audio playback is supported with compatible apps and services. Beats Pill integrates with both Apple and Android ecosystems, requiring compatible operating system software and Google Play Services for Android devices. New Apple Music subscribers can receive three months free when connecting the Beats Pill to an eligible Apple device. This speaker represents an upgrade over the Beats Pill+, offering enhanced features. Additionally, the Beats Pill supports fast charging, providing a significant amount of playback time from just a 10-minute charge. As with all battery-powered devices, real-world performance will depend on specific conditions and usage patterns.",
        stock: 378,
        categoryId: categories.Speakers?.id,
      },
      {
        name: "Beats Pill Black",
        price: 149.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/speakers/beats-pill/pdp/product-carousel/black/black-01-beatspill-wired.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Pill speaker offers extended battery life, tested by Apple with a standard playlist at 50% volume, though actual battery life varies with usage and environment. It features IP67 dust and water resistance, making it suitable for both indoor and outdoor use, although this resistance may decrease over time. Lossless audio playback is supported with compatible apps and services. Beats Pill integrates with both Apple and Android ecosystems, requiring compatible operating system software and Google Play Services for Android devices. New Apple Music subscribers can receive three months free when connecting the Beats Pill to an eligible Apple device. This speaker represents an upgrade over the Beats Pill+, offering enhanced features. Additionally, the Beats Pill supports fast charging, providing a significant amount of playback time from just a 10-minute charge. As with all battery-powered devices, real-world performance will depend on specific conditions and usage patterns.",
        stock: 200,
        categoryId: categories.Speakers?.id,
      },
      {
        name: "Beats Solo Buds Matte Black",
        price: 79.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/solo-buds/pdp/product-carousel/matte-black/black-01-solobuds.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Solo Buds offer extended battery life, tested by Apple with a standard playlist at 50% volume, though actual battery life varies with usage and environment. The testing involved pre-production units paired with iPhone 15 Pro devices. Beats Solo Buds integrate with both Apple and Android ecosystems, requiring compatible operating system software and Google Play Services for Android devices. New Apple Music subscribers can receive three months free when connecting the earbuds to an eligible Apple device. Additionally, the Beats Solo Buds support fast charging, providing a substantial amount of playback time from just a 5-minute charge. This feature, along with the standard battery life testing, was conducted using pre-production units. Certain features are also noted as requiring an iPhone 15 or supported Android device.",
        stock: 327,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Solo Buds Artic Purple",
        price: 79.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/solo-buds/pdp/product-carousel/arctic-purple/purple-01-solobuds.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Solo Buds offer extended battery life, tested by Apple with a standard playlist at 50% volume, though actual battery life varies with usage and environment. The testing involved pre-production units paired with iPhone 15 Pro devices. Beats Solo Buds integrate with both Apple and Android ecosystems, requiring compatible operating system software and Google Play Services for Android devices. New Apple Music subscribers can receive three months free when connecting the earbuds to an eligible Apple device. Additionally, the Beats Solo Buds support fast charging, providing a substantial amount of playback time from just a 5-minute charge. This feature, along with the standard battery life testing, was conducted using pre-production units. Certain features are also noted as requiring an iPhone 15 or supported Android device.",
        stock: 278,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Solo Buds Transparent Red",
        price: 79.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/solo-buds/pdp/product-carousel/transparent-red/red-01-solobuds.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Solo Buds offer extended battery life, tested by Apple with a standard playlist at 50% volume, though actual battery life varies with usage and environment. The testing involved pre-production units paired with iPhone 15 Pro devices. Beats Solo Buds integrate with both Apple and Android ecosystems, requiring compatible operating system software and Google Play Services for Android devices. New Apple Music subscribers can receive three months free when connecting the earbuds to an eligible Apple device. Additionally, the Beats Solo Buds support fast charging, providing a substantial amount of playback time from just a 5-minute charge. This feature, along with the standard battery life testing, was conducted using pre-production units. Certain features are also noted as requiring an iPhone 15 or supported Android device.",
        stock: 379,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Solo Buds Storm Gray",
        price: 79.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/solo-buds/pdp/product-carousel/storm-gray/gray-01-solobuds.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Solo Buds offer extended battery life, tested by Apple with a standard playlist at 50% volume, though actual battery life varies with usage and environment. The testing involved pre-production units paired with iPhone 15 Pro devices. Beats Solo Buds integrate with both Apple and Android ecosystems, requiring compatible operating system software and Google Play Services for Android devices. New Apple Music subscribers can receive three months free when connecting the earbuds to an eligible Apple device. Additionally, the Beats Solo Buds support fast charging, providing a substantial amount of playback time from just a 5-minute charge. This feature, along with the standard battery life testing, was conducted using pre-production units. Certain features are also noted as requiring an iPhone 15 or supported Android device.",
        stock: 217,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Studio Buds + Black / Gold",
        price: 169.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/studio-buds-plus/pdp/product-carousel/black/alt/studiobudsplus-blackgold-01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Studio Buds + offer improved battery life compared to the first-generation model, with Apple's testing showing extended playback time under controlled conditions. They support Dolby Atmos (with compatible content and devices) and feature IPX4 sweat and water resistance, suitable for non-water sports and exercise. Battery life varies with usage and environment, and the charging case is not water-resistant. These earbuds are designed for seamless integration with both Apple and Android devices. Apple users benefit from iCloud features, Siri compatibility, and Find My Beats integration, while Android users can utilize Google Fast Pair, Audio Switch, and Find My Device. Both platforms require compatible operating systems and Google Play Services for Android features. Additionally, new Apple Music subscribers can get three months free when pairing the Beats Studio Buds + with an eligible Apple device. The earbuds also offer fast charging, providing a significant amount of playback time from just a 5-minute charge. Apple emphasizes the sustainability of the product's packaging, excluding adhesives, inks, and coatings from their plastic content and weight calculations.",
        stock: 196,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Studio Buds + Ivory",
        price: 169.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/studio-buds-plus/pdp/product-carousel/ivory/alt/studiobudsplus-ivory-01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Studio Buds + offer improved battery life compared to the first-generation model, with Apple's testing showing extended playback time under controlled conditions. They support Dolby Atmos (with compatible content and devices) and feature IPX4 sweat and water resistance, suitable for non-water sports and exercise. Battery life varies with usage and environment, and the charging case is not water-resistant. These earbuds are designed for seamless integration with both Apple and Android devices. Apple users benefit from iCloud features, Siri compatibility, and Find My Beats integration, while Android users can utilize Google Fast Pair, Audio Switch, and Find My Device. Both platforms require compatible operating systems and Google Play Services for Android features. Additionally, new Apple Music subscribers can get three months free when pairing the Beats Studio Buds + with an eligible Apple device. The earbuds also offer fast charging, providing a significant amount of playback time from just a 5-minute charge. Apple emphasizes the sustainability of the product's packaging, excluding adhesives, inks, and coatings from their plastic content and weight calculations.",
        stock: 0,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Studio Buds + Transparent",
        price: 169.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/studio-buds-plus/pdp/product-carousel/transparent/alt/studiobudsplus-transparent-01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Studio Buds + offer improved battery life compared to the first-generation model, with Apple's testing showing extended playback time under controlled conditions. They support Dolby Atmos (with compatible content and devices) and feature IPX4 sweat and water resistance, suitable for non-water sports and exercise. Battery life varies with usage and environment, and the charging case is not water-resistant. These earbuds are designed for seamless integration with both Apple and Android devices. Apple users benefit from iCloud features, Siri compatibility, and Find My Beats integration, while Android users can utilize Google Fast Pair, Audio Switch, and Find My Device. Both platforms require compatible operating systems and Google Play Services for Android features. Additionally, new Apple Music subscribers can get three months free when pairing the Beats Studio Buds + with an eligible Apple device. The earbuds also offer fast charging, providing a significant amount of playback time from just a 5-minute charge. Apple emphasizes the sustainability of the product's packaging, excluding adhesives, inks, and coatings from their plastic content and weight calculations.",
        stock: 47,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Studio Buds + Black",
        price: 169.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/studio-buds-plus/pdp/product-carousel/black/alt/studiobudsplus-blackgold-01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Studio Buds + offer improved battery life compared to the first-generation model, with Apple's testing showing extended playback time under controlled conditions. They support Dolby Atmos (with compatible content and devices) and feature IPX4 sweat and water resistance, suitable for non-water sports and exercise. Battery life varies with usage and environment, and the charging case is not water-resistant. These earbuds are designed for seamless integration with both Apple and Android devices. Apple users benefit from iCloud features, Siri compatibility, and Find My Beats integration, while Android users can utilize Google Fast Pair, Audio Switch, and Find My Device. Both platforms require compatible operating systems and Google Play Services for Android features. Additionally, new Apple Music subscribers can get three months free when pairing the Beats Studio Buds + with an eligible Apple device. The earbuds also offer fast charging, providing a significant amount of playback time from just a 5-minute charge. Apple emphasizes the sustainability of the product's packaging, excluding adhesives, inks, and coatings from their plastic content and weight calculations.",
        stock: 196,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Flex Flame Blue",
        price: 69.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/beats-flex/pdp/product-carousel/flame-blue/pc-beats-flex-flame-blue-earbuds.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Flex earbuds offer compatibility across a range of Apple devices, including iPhones and iPads running iOS/iPadOS 14 or later, Macs running macOS 11 or later, Apple Watches running watchOS 7 or later, and Apple TVs running tvOS 14 or later. Android compatibility varies. The Audio Sharing feature is compatible with various Beats and AirPods models and requires specific iOS or iPadOS versions on compatible devices. Apple's battery testing, conducted with pre-production units, showed up to 12 hours of listening time at 50% volume. A 10-minute charge provides additional playback time, though actual battery life depends on usage and environmental factors. The Find My feature, which requires an iCloud account and compatible Apple devices, allows users to locate the headphones within Bluetooth range of an iOS device signed into iCloud. These earbuds require an iCloud account and compatible Apple operating systems for certain features, such as Find My Beats. This feature requires iOS 14.5 or later, iPadOS 14.5 or later, or macOS Big Sur 11.3 or later. The Find My function allows for locating the headphones and playing a sound when within Bluetooth range of a device signed into iCloud.",
        stock: 80,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Flex Beats Black",
        price: 69.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/beats-flex/pdp/product-carousel/black/pc-beats-flex-black-earbuds.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Flex earbuds offer compatibility across a range of Apple devices, including iPhones and iPads running iOS/iPadOS 14 or later, Macs running macOS 11 or later, Apple Watches running watchOS 7 or later, and Apple TVs running tvOS 14 or later. Android compatibility varies. The Audio Sharing feature is compatible with various Beats and AirPods models and requires specific iOS or iPadOS versions on compatible devices. Apple's battery testing, conducted with pre-production units, showed up to 12 hours of listening time at 50% volume. A 10-minute charge provides additional playback time, though actual battery life depends on usage and environmental factors. The Find My feature, which requires an iCloud account and compatible Apple devices, allows users to locate the headphones within Bluetooth range of an iOS device signed into iCloud. These earbuds require an iCloud account and compatible Apple operating systems for certain features, such as Find My Beats. This feature requires iOS 14.5 or later, iPadOS 14.5 or later, or macOS Big Sur 11.3 or later. The Find My function allows for locating the headphones and playing a sound when within Bluetooth range of a device signed into iCloud.",
        stock: 50,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Flex Yuzu Yellow",
        price: 69.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/beats-flex/pdp/product-carousel/yuzu-yellow/pc-beats-flex-yuzu-yellow-earbuds.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Flex earbuds offer compatibility across a range of Apple devices, including iPhones and iPads running iOS/iPadOS 14 or later, Macs running macOS 11 or later, Apple Watches running watchOS 7 or later, and Apple TVs running tvOS 14 or later. Android compatibility varies. The Audio Sharing feature is compatible with various Beats and AirPods models and requires specific iOS or iPadOS versions on compatible devices. Apple's battery testing, conducted with pre-production units, showed up to 12 hours of listening time at 50% volume. A 10-minute charge provides additional playback time, though actual battery life depends on usage and environmental factors. The Find My feature, which requires an iCloud account and compatible Apple devices, allows users to locate the headphones within Bluetooth range of an iOS device signed into iCloud. These earbuds require an iCloud account and compatible Apple operating systems for certain features, such as Find My Beats. This feature requires iOS 14.5 or later, iPadOS 14.5 or later, or macOS Big Sur 11.3 or later. The Find My function allows for locating the headphones and playing a sound when within Bluetooth range of a device signed into iCloud.",
        stock: 19,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats Flex Smoke Gray",
        price: 69.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/beats-flex/pdp/product-carousel/smoke-gray/pc-beats-flex-smoke-gray-earbuds.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats Flex earbuds offer compatibility across a range of Apple devices, including iPhones and iPads running iOS/iPadOS 14 or later, Macs running macOS 11 or later, Apple Watches running watchOS 7 or later, and Apple TVs running tvOS 14 or later. Android compatibility varies. The Audio Sharing feature is compatible with various Beats and AirPods models and requires specific iOS or iPadOS versions on compatible devices. Apple's battery testing, conducted with pre-production units, showed up to 12 hours of listening time at 50% volume. A 10-minute charge provides additional playback time, though actual battery life depends on usage and environmental factors. The Find My feature, which requires an iCloud account and compatible Apple devices, allows users to locate the headphones within Bluetooth range of an iOS device signed into iCloud. These earbuds require an iCloud account and compatible Apple operating systems for certain features, such as Find My Beats. This feature requires iOS 14.5 or later, iPadOS 14.5 or later, or macOS Big Sur 11.3 or later. The Find My function allows for locating the headphones and playing a sound when within Bluetooth range of a device signed into iCloud.",
        stock: 58,
        categoryId: categories.Earbuds?.id,
      },
      {
        name: "Beats iPhone 16 Pro Max Case with MagSafe",
        price: 49.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/accessories/phone-cases/iphone-16/pdp/product-carousel/iphone-16-pro-max/riptide-blue/pc-iphone-16-pro-max-riptide-blue-01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats case with MagSafe is designed for iPhone 16 models, offering robust protection against scratches and drops through extensive testing during development. Available in four precise sizes to match each iPhone 16 model, it features Camera Control, facilitated by a sapphire crystal and conductive layer for finger movement communication. The case combines a hardshell polycarbonate back with flexible sidewalls for optimal shock absorption, maintaining a thin, light, and grippable design. A glossy, scratch-resistant outer coating provides additional protection, while a soft microfiber lining minimizes surface scratches. Fully MagSafe compatible, the case includes built-in magnets for easy attachment and efficient wireless charging, and is offered in four sophisticated colorways with bold interior accents.",
        stock: 409,
        categoryId: categories.Accessories?.id,
      },
      {
        name: "Beats iPhone 16 Pro Case with MagSafe",
        price: 49.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/accessories/phone-cases/iphone-16/pdp/product-carousel/iphone-16-pro/summit-stone/pc-iphone-16-pro-summit-stone-01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats case with MagSafe is designed for iPhone 16 models, offering robust protection against scratches and drops through extensive testing during development. Available in four precise sizes to match each iPhone 16 model, it features Camera Control, facilitated by a sapphire crystal and conductive layer for finger movement communication. The case combines a hardshell polycarbonate back with flexible sidewalls for optimal shock absorption, maintaining a thin, light, and grippable design. A glossy, scratch-resistant outer coating provides additional protection, while a soft microfiber lining minimizes surface scratches. Fully MagSafe compatible, the case includes built-in magnets for easy attachment and efficient wireless charging, and is offered in four sophisticated colorways with bold interior accents.",
        stock: 436,
        categoryId: categories.Accessories?.id,
      },
      {
        name: "Beats iPhone 16 Plus Case with MagSafe",
        price: 49.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/accessories/phone-cases/iphone-16/pdp/product-carousel/iphone-16-plus/sunset-purple/pc-iphone-16-plus-sunset-purple-01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats case with MagSafe is designed for iPhone 16 models, offering robust protection against scratches and drops through extensive testing during development. Available in four precise sizes to match each iPhone 16 model, it features Camera Control, facilitated by a sapphire crystal and conductive layer for finger movement communication. The case combines a hardshell polycarbonate back with flexible sidewalls for optimal shock absorption, maintaining a thin, light, and grippable design. A glossy, scratch-resistant outer coating provides additional protection, while a soft microfiber lining minimizes surface scratches. Fully MagSafe compatible, the case includes built-in magnets for easy attachment and efficient wireless charging, and is offered in four sophisticated colorways with bold interior accents.",
        stock: 649,
        categoryId: categories.Accessories?.id,
      },
      {
        name: "Beats iPhone 16 Case with MagSafe",
        price: 49.99,
        img: "https://www.beatsbydre.com/content/dam/beats/web/product/accessories/phone-cases/iphone-16/pdp/product-carousel/iphone-16/sunrise-pink/pc-iphone-16-sunrise-pink-01.jpg.large.2x.jpg",
        description: "Built for athlets.",
        complete_description:
          "The Beats case with MagSafe is designed for iPhone 16 models, offering robust protection against scratches and drops through extensive testing during development. Available in four precise sizes to match each iPhone 16 model, it features Camera Control, facilitated by a sapphire crystal and conductive layer for finger movement communication. The case combines a hardshell polycarbonate back with flexible sidewalls for optimal shock absorption, maintaining a thin, light, and grippable design. A glossy, scratch-resistant outer coating provides additional protection, while a soft microfiber lining minimizes surface scratches. Fully MagSafe compatible, the case includes built-in magnets for easy attachment and efficient wireless charging, and is offered in four sophisticated colorways with bold interior accents.",
        stock: 590,
        categoryId: categories.Accessories?.id,
      },
    ];
    // Delete old products
    await Product.destroy({ where: {} });
    await Product.bulkCreate(products);

    console.log("Product seeder ran succefully.");
  } catch (error) {
    console.error("Error running product seeder:", error);
  }
};
