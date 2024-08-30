export const swaggerDocument = {
  GET_POSTS: {
    summary: '게시글 전체 조회',
    description: `게시글 전체 조회.
                  쿼리 파라미터 참고.`,
  },
  GET_COMMENTS: {
    summary: '댓글 전체 조회',
    description: `댓글 전체 조회.
                  쿼리 파라미터 참고.`,
  },

  GET_MENUS: {
    summary: '메뉴 전체 조회',
    description: `메뉴 전체 조회.
                  메뉴와 서브메뉴 정보를 포함하여 반환합니다.`,
  },

  GET_SUBMENUS: {
    summary: '서브메뉴 전체 조회',
    description: `서브메뉴 전체 조회.
                  각 서브메뉴의 정보를 반환합니다.`,
  },

  GET_LEAGUES: {
    summary: '리그 전체 조회',
    description: `리그를 전체 조회.
                  쿼리 파라미터 참고.`,
  },

  GET_TEAMS: {
    summary: '팀 전체 조회',
    description: `팀을 전체 조회.
                  쿼리 파라미터 참고.`,
  },

  GET_HEALTH: {
    summary: '헬스체크용 API',
    description: '서버의 상태를 확인합니다.',
  },
}
