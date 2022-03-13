package com.c0821g1.sprint1.service.account.impl;
import com.c0821g1.sprint1.entity.security.AppUser;
import com.c0821g1.sprint1.entity.security.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

// NghiaDM
public class MyUserDetailsImpl implements UserDetails {
//    Transient đóng vai trò quan trọng trong bảo mật, bạn có thể sử dụng nó để chắc rằng không lưu các nội dung
//    nhạy cảm xuống file, database hoặc chuyển chúng đến một nơi khác.
//Mặc định Spring Security sử dụng một đối tượng UserDetails để chứa toàn bộ thông tin về người dùng. Vì vậy,
//    chúng ta cần tạo ra một class mới giúp chuyển các thông tin của User thành UserDetails
//
    private transient AppUser appUser;

    public MyUserDetailsImpl(AppUser appUser) {
        this.appUser = appUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        Set<Role> roles = this.appUser.getRoles();
        for (Role role: roles) {
                grantedAuthorities.add( new SimpleGrantedAuthority(role.getName()));
        }
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return this.appUser.getPassword();
    }

    @Override
    public String getUsername() {
        return this.appUser.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.appUser.getEnabled();
    }
}
