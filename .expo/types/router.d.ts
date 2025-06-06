/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/SwipeRow` | `/_sitemap` | `/components` | `/components/` | `/components/App` | `/components/Collapsible` | `/components/ExternalLink` | `/components/HelloWave` | `/components/ParallaxScrollView` | `/components/Task` | `/components/ThemedText` | `/components/ThemedView` | `/components/__tests__/ThemedText-test` | `/components/navigation/TabBarIcon`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
