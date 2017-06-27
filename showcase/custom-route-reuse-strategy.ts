import { RouterModule, Routes, Router, RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';


// This impl. bases upon one that can be found in the router's test cases.
export class CustomReuseStrategy implements RouteReuseStrategy {

    static handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {

        if (Object.keys(route.params).length > 0) {
            return false;
        }
        if (route.data["shouldDetach"] != undefined)
        {
            return route.data["shouldDetach"];
        }
        return true;

    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {

        CustomReuseStrategy.handlers[this.getKey(route)] = handle;

    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!CustomReuseStrategy.handlers[this.getKey(route)];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) return null;
        return CustomReuseStrategy.handlers[this.getKey(route)];

    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    getKey(route: ActivatedRouteSnapshot): string {
        
        let key: string = route.routeConfig.path;

        // if (storage) {
        //     key += storage.username;
        //     if (storage.companydetails) {
        //         key += storage.companydetails.companyguid;
        //     }
        // }
        //if (Object.keys(storage.companydetails).length>0)
        //{
        //    key += storage.companydetails.companyguid;
        //}
        return key;
    }

    static clearCompSnapshot() {
        CustomReuseStrategy.handlers = {};
    }

}
