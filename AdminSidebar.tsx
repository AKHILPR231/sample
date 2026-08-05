.header {
  grid-area: header;
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 28px;
  background: linear-gradient(90deg, var(--navy-900), var(--navy-800));
  color: #fff;
}

.header__brand {
  display: flex;
  align-items: center;
  min-width: var(--sidebar-w);
}

.header__outlet {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  padding: 0 16px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.header__outlet svg {
  color: rgba(255, 255, 255, 0.7);
}

.header__search {
  flex: 1;
  max-width: 560px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 42px;
  padding: 0 16px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.header__search svg {
  color: rgba(255, 255, 255, 0.6);
  flex: none;
}

.header__searchInput {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: #fff;
  font-size: 14px;
}

.header__searchInput::placeholder {
  color: rgba(255, 255, 255, 0.55);
}

.header__right {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-left: auto;
}

.header__bell {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.85);
}

.header__bell:hover {
  background: rgba(255, 255, 255, 0.08);
}

.header__bellDot {
  position: absolute;
  top: 9px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid var(--navy-800);
}

.header__user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__userMeta {
  text-align: right;
  line-height: 1.25;
}

.header__userName {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.header__userRole {
  display: inline-block;
  margin-top: 2px;
  font-size: 11px;
  font-weight: 600;
  color: #bcd0ff;
  background: rgba(59, 130, 246, 0.18);
  padding: 1px 8px;
  border-radius: var(--radius-pill);
}

.header__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--navy-600);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  border: 2px solid rgba(255, 255, 255, 0.15);
}

@media (max-width: 900px) {
  .header__brand {
    min-width: 0;
  }

  .header__search,
  .header__userMeta {
    display: none;
  }
}
