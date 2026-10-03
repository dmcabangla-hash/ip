import { TeamProfile } from '../types';

export const getTeamLogoSrc = (team?: Partial<TeamProfile> | string | null): string => {
  if (!team) return '/nct_logo.svg';

  if (typeof team === 'string') {
    const t = team.toLowerCase();
    if (t.includes('national') || t.includes('nct')) return '/nct_logo.svg';
    if (t.includes('rdx')) return '/rdx_logo.svg';
    if (t.includes('71')) return '/c71_logo.svg';
    if (t.includes('bca') || t.includes('army')) return '/bca_logo.svg';
    if (t.includes('dark shadow') || t.includes('dsh')) return '/dsh_logo.svg';
    if (t.includes('phantom')) return '/dsh_logo.svg';
    if (t.includes('red force') || t.includes('rfu')) return '/rfu_logo.svg';
    if (t.includes('anonghost') || t.includes('agcl')) return '/agcl_logo.svg';
    return '/nct_logo.svg';
  }

  // If team has an explicitly uploaded/provided avatar that is not a human portrait
  if (team.avatarUrl && team.avatarUrl.trim().length > 0 && !team.avatarUrl.includes('raj_alamin')) {
    return team.avatarUrl;
  }

  const name = (team.name || '').toLowerCase();
  const id = (team.id || '').toLowerCase();
  const alias = (team.alias || '').toLowerCase();

  if (id === 'team-nct' || name.includes('national') || alias === 'nct') return '/nct_logo.svg';
  if (id === 'team-rdx' || name.includes('rdx') || alias === 'rdx') return '/rdx_logo.svg';
  if (id === 'team-c71' || name.includes('71') || alias === 'c71') return '/c71_logo.svg';
  if (id === 'team-bca' || name.includes('army') || alias === 'bca') return '/bca_logo.svg';
  if (id === 'team-darkshadow' || name.includes('dark shadow') || alias === 'dsh') return '/dsh_logo.svg';
  if (id === 'team-phantom' || name.includes('phantom')) return '/dsh_logo.svg';
  if (id === 'team-redforce' || name.includes('red force') || alias === 'rfu') return '/rfu_logo.svg';
  if (id === 'team-anonghost' || name.includes('anonghost') || alias === 'agcl') return '/agcl_logo.svg';

  return '/nct_logo.svg';
};
