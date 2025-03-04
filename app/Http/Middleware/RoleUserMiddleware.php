<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class RoleUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        //Hapus 'admin-' agar lansung sama di dtb role
        $replaced = Str::replace('admin-', '', $role);

        if (!$request->user()->hasRole($role)) {
            return redirect(route($request->user()->role . '.index'));
        }

        return $next($request);
    }
}
