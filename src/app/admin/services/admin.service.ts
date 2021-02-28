import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    isAdmin(): boolean {
        return true;
    }

    checkAccess(): boolean {
        if (!this.isAdmin()) {
            alert('No access');
            return false;
        }
        return true;
    }
}
