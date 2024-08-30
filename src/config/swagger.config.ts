export const swaggerDocument = {
  GET_POSTS: {
    summary: '게시글 전체 조회',
    description: '게시글 전체 조회. 쿼리 파라미터 참고.',
  },
  GET_POST_BY_ID: {
    summary: '게시글 단일 조회',
    description: '특정 ID에 해당하는 게시글을 조회합니다.',
  },
  GET_POSTS_BY_MENU_ID: {
    summary: '메뉴별 게시글 조회',
    description: '특정 메뉴 ID에 해당하는 게시글을 조회합니다.',
  },
  GET_POSTS_BY_SUBMENU_ID: {
    summary: '서브메뉴별 게시글 조회',
    description: '특정 서브메뉴 ID에 해당하는 게시글을 조회합니다.',
  },
  CREATE_POST: {
    summary: '게시글 생성',
    description: '새로운 게시글을 생성합니다.',
  },
  UPDATE_POST: {
    summary: '게시글 업데이트',
    description: '특정 ID에 해당하는 게시글을 업데이트합니다.',
  },
  DELETE_POST: {
    summary: '게시글 삭제',
    description: '특정 ID에 해당하는 게시글을 삭제합니다.',
  },
  GET_COMMENTS: {
    summary: '댓글 전체 조회',
    description: '댓글 전체 조회. 쿼리 파라미터 참고.',
  },
  GET_COMMENT_BY_ID: {
    summary: '댓글 단일 조회',
    description: '특정 ID에 해당하는 댓글을 조회합니다.',
  },
  GET_COMMENTS_BY_POST_ID: {
    summary: '게시글별 댓글 조회',
    description: '특정 게시글 ID에 해당하는 모든 댓글을 조회합니다.',
  },
  GET_MENUS: {
    summary: '메뉴 전체 조회',
    description: '메뉴 전체 조회. 메뉴와 서브메뉴 정보를 포함하여 반환합니다.',
  },
  GET_MENU_BY_ID: {
    summary: '메뉴 단일 조회',
    description: '특정 ID에 해당하는 메뉴를 조회합니다.',
  },
  GET_MENUS_BY_CATEGORY_ID: {
    summary: '카테고리별 메뉴 조회',
    description: '특정 카테고리 ID에 해당하는 메뉴를 조회합니다.',
  },
  CREATE_MENU: {
    summary: '메뉴 생성',
    description: '새로운 메뉴를 생성합니다.',
  },
  UPDATE_MENU: {
    summary: '메뉴 업데이트',
    description: '특정 ID에 해당하는 메뉴를 업데이트합니다.',
  },
  DELETE_MENU: {
    summary: '메뉴 삭제',
    description: '특정 ID에 해당하는 메뉴를 삭제합니다.',
  },
  GET_SUBMENUS: {
    summary: '서브메뉴 전체 조회',
    description: '서브메뉴 전체 조회. 각 서브메뉴의 정보를 반환합니다.',
  },
  GET_SUBMENU_BY_ID: {
    summary: '서브메뉴 단일 조회',
    description: '특정 ID에 해당하는 서브메뉴를 조회합니다.',
  },
  GET_SUBMENUS_BY_MENU_ID: {
    summary: '메뉴별 서브메뉴 조회',
    description: '특정 메뉴 ID에 해당하는 서브메뉴를 조회합니다.',
  },
  CREATE_SUBMENU: {
    summary: '서브메뉴 생성',
    description: '새로운 서브메뉴를 생성합니다.',
  },
  UPDATE_SUBMENU: {
    summary: '서브메뉴 업데이트',
    description: '특정 ID에 해당하는 서브메뉴를 업데이트합니다.',
  },
  DELETE_SUBMENU: {
    summary: '서브메뉴 삭제',
    description: '특정 ID에 해당하는 서브메뉴를 삭제합니다.',
  },
  GET_LEAGUES: {
    summary: '리그 전체 조회',
    description: '리그를 전체 조회. 쿼리 파라미터 참고.',
  },
  GET_TEAMS: {
    summary: '팀 전체 조회',
    description: '팀을 전체 조회. 쿼리 파라미터 참고.',
  },
  GET_HEALTH: {
    summary: '헬스체크용 API',
    description: '서버의 상태를 확인합니다.',
  },
}
