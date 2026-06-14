"use client"

import UserProfile from './UserProfile'
import { useSession } from '@/app/(main)/SessionProvider'

export default function Auth() {
    const { user } = useSession()
    if (!user) return null;

    return (
        <div className="flex items-center justify-center">
            <div className="h-12 w-12 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_12px_rgba(34,197,94,0.5)] hover:shadow-[0_0_22px_rgba(34,197,94,0.9)] border border-primary/40 bg-background">
                <UserProfile
                    user={{
                        image: user.image,
                        name: user.name,
                        username: user.username
                    }}
                />
            </div>
        </div>
    )
}
